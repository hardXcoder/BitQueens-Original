import React, { Component } from 'react'
import Web3 from 'web3'

import BitQueens from '../abis_bsc/BitQueens.json'
import ChangeQueenNameToken from '../abis_bsc/ChangeQueenNameToken.json'
import Navbar from './Navbar'
import Footer from './Footer'

// import Footer2 from './Footer2'


import Main from './Main'
import Gallery from './Gallery'
// import Home from './Home'
import About from './About'
import Wallet from './Wallet'
import Cqnt from './Cqnt'
import Detail from './detail'
import FAQ from './FAQ'
import Terms from './Terms'
import Disclaimer from './Disclaimer'

import HowTobuy from './HowTobuy'



import './App.css'
import { Switch, Route } from 'react-router-dom'


import { bitqueen_contract_address, cqnt_contract_address } from '../constants'

import { web3_Api } from '../constants'

import { getCurrentAccount, getWeb3Util } from './util'


class App extends Component {

  async componentWillMount() {
    window.sessionStorage.setItem("tokenIndices", "{}");
    window.sessionStorage.setItem("accumulatedCqnt", "{}");

    await this.loadWeb3FromInfura()


    if (window.ethereum) {

      const currentAccount = await getCurrentAccount();
      this.setState({ account: currentAccount })

      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("in app event handler")

        if (accounts && accounts.length != 0) {
          this.setState({ account: accounts[0] })
        }
        else {
          this.setState({ account: '0x0' })

        }
        this.loadWeb3();
      })


      //Checking if the account is connected to metamask, then loading all data
      if (currentAccount != '0x0') {
        this.loadWeb3();
      }
    }

  }



  componentWillUnmount() {
    window.sessionStorage.removeItem("tokenIndices");
    window.sessionStorage.removeItem("accumulatedCqnt");
  }

  connectToWallet = async () => {

    try {

      await window.ethereum.enable().then((account) => {
        console.log("Guru")
        this.setState({ account: account[0] })
      })
      this.loadWeb3()

    } catch (error) {

    }

  }

  async loadWeb3FromInfura() {

   
    const web3Testnet = new Web3(web3_Api);

    const bitQueenContractInfura = await new web3Testnet.eth.Contract(BitQueens, bitqueen_contract_address)

    var totalInfura = await this.totalSupplyFromInfura(bitQueenContractInfura);

    this.setState({ totalSupply: totalInfura })

    await this.remQtyInTier(totalInfura);

  }

  async loadWeb3() {

    // console.log("Hi am being called loadWb3")

    if (window.ethereum) {

      await this.loadBlockchainData()

    }
    else {


      const bitQueenContractInfura = await new this.web3.eth.Contract(BitQueens, bitqueen_contract_address)

      var totalInfura = await this.totalSupplyFromInfura(bitQueenContractInfura);

      this.setState({ totalSupply: totalInfura })
      this.setState({ isWeb3Browser: false })

      // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }


  }


  async loadBlockchainData() {

    // Please before removing this comment catch all the errors safely and dont let
    // the app crash

    try {

      const bitQueenContract = await new this.web3.eth.Contract(BitQueens, bitqueen_contract_address)

      if (bitQueenContract) {

        // console.log("Bitqueen contract address :" + bitQueenContract.options.address)

        this.setState({ bitQueenContract })


        let numberOfBitQueensInWallet = await bitQueenContract.methods.balanceOf(this.state.account).call()
        // console.log("Number of BTQ in wallet are  : " + numberOfBitQueensInWallet)
        this.setState({ numberOfBitQueensInWallet })

        // Get and set the current BitQueeen price
        this.getCurrentBitqueenPrice()
      }
      else {
        window.alert('BitQueen contract not deployed to detected network.')
      }

      const changeQueenNameTokenContract = await new this.web3.eth.Contract(ChangeQueenNameToken, cqnt_contract_address)

      if (changeQueenNameTokenContract) {

        // console.log("changeQueenNameToken contract address :" + changeQueenNameTokenContract.options.address)
        this.setState({ changeQueenNameTokenContract });

      }
      else {
        window.alert('ChangeQueenNameToken contract not deployed to detected network.')
      }

      //setting the totalsupply of BTQ till now
      await this.totalSupply();

      //Setting the remining qty at price in state
     // await this.remQtyInTier();

      //Fetching the BTQ token indices and storing in array

      this.setState({ loading: false })


    } catch (error) {

    }



  }


  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  buyBitqueens = async (numberOfBitqueens, callback) => {

     if(this.state.account == '0x0')
     {
       await this.connectToWallet();
     }

    await this.loadWeb3()

    var validationMessage = this.validateBuyingParams(numberOfBitqueens);

    if (validationMessage === "validated") {

      try {

        var currentBitqueenPrice = await this.getCurrentBitqueenPrice();

        this.setState({ currentBitqueenPrice })

        this.setState({ loading: true })

        await this.state.bitQueenContract.methods.mintQueen(numberOfBitqueens).send({
          from: this.state.account,
          value: this.state.currentBitqueenPrice * numberOfBitqueens,
          gas: 300000 * numberOfBitqueens,
        }).on('transactionHash', (hash) => {

        })
          .on('receipt', (receipt) => {
            window.alert("Transaction successful")

          })
          .on('error', (err) => {
            window.alert(err.message)
          });

      } catch (error) {


      } finally {
        if (callback) {
          callback();
        }
        console.log("In buy finally")
       
        await this.loadWeb3();
        await this.remQtyInTier(this.state.totalSupply);

      }

    }
    else {
      window.alert(validationMessage);
      if (callback) {
        callback();
      }
    }

  }


  validateBuyingParams(numberOfBitqueens) {

    var validationMessage = "validated";

    if (numberOfBitqueens > 30) {
      validationMessage = 'You cannot buy more than 30 NFT ART in single transaction';
      return validationMessage;
    }
    if (numberOfBitqueens <= 0) {
      validationMessage = 'Number of NFT to buy should be greater than zero';
      return validationMessage;
    }

    return validationMessage;

  }

  getCurrentBitqueenPrice = async () => {

    const bitQueenContract = await new this.web3.eth.Contract(BitQueens, bitqueen_contract_address)

    //Returning in wei from this function as the COntract doesnt understand the decimals
    let currentBitqueenPriceinWei = await bitQueenContract.methods.getQueenPrice().call()
    var currentBitqueenPrice = Number(this.toEthUnit(currentBitqueenPriceinWei))
    this.setState({ currentBitqueenPrice })

    return currentBitqueenPriceinWei;
  }

  toEthUnit = wei => {
    var num = (Web3.utils.fromWei(wei));
    var value = parseFloat(num).toFixed(2);
    return value;
  };


  totalSupplyFromInfura = async (bitQueenContract) => {

    var totalSupply = await bitQueenContract.methods.totalSupply().call();

    return totalSupply

  }

  totalSupply = async (tokenId) => {

    this.setState({ loading: true })

    var totalSupply = await this.state.bitQueenContract.methods.totalSupply().call();

    this.setState({ loading: true })

    this.setState({ totalSupply })

    console.log("Hi i am being called in totlaSuply function and total is :" + totalSupply)

    return totalSupply;

  }

  remQtyInTier = async (totalInfura) => {

    // Adjust these tiers later acordingly
    var tier1 = 1000;
    var tier2 = 2000;
    var tier3 = 3000;
    var tier4 = 4000;
    var tier5 = 5000;
    var tier6 = 6000;
    var tier7 = 7000;
    var tier8 = 8000;
    var tier9 = 9000;
    var tier10 = 10000;

    var totalSupply = totalInfura;

    var remQty;

    if (totalSupply > tier9) {
      remQty = tier10 - totalSupply;
    }
    else if (totalSupply > tier8) {
      remQty = tier9 - totalSupply;
    }
    else if (totalSupply > tier7) {
      remQty = tier8 - totalSupply;
    }
    else if (totalSupply > tier6) {
      remQty = tier7 - totalSupply;
    }
    else if (totalSupply > tier5) {
      remQty = tier6 - totalSupply;
    }
    else if (totalSupply > tier4) {
      remQty = tier5 - totalSupply;
    }
    else if (totalSupply > tier3) {
      remQty = tier4 - totalSupply;
    }
    else if (totalSupply > tier2) {
      remQty = tier3 - totalSupply;
    }
    else if (totalSupply > tier1) {
      remQty = tier2 - totalSupply;
    }
    else {
      remQty = tier1 - totalSupply;
    }

    // console.log("The remaing tier qty is :" + remQty)
    this.setState({ remQty })


  }


  currentTierPrice = () => {

    var currentTierQueenPrice = 0.5;
    this.setState({ currentTierQueenPrice })

  }

  constructor(props) {
    super(props)

    this.state = {
      account: '0x0',
      bitQueenContract: {},
      bitQueenSymbol: "0",
      numberOfBitQueensInWallet: 0,
      currentBitqueenPrice: 0.1,
      loading: true,
      changeQueenNameTokenContract: {},
      changeQueenNameTokenSymbol: "0",
      accumulatedCQNT: "0",
      tokenIndicesArray: [],
      numberOfCQNTInWallet: 0,
      tokenName: null,
      srcLinkArray: [],
      totalSupply: 0,
      remQty: 0,
      currentTierQueenPrice: 0,
      isWeb3Browser: true,

    }

    this.web3 = getWeb3Util();

  }

  render() {
    let content
    if (this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {

      content = <Main
        bitQueenSymbol={this.state.bitQueenSymbol}
        buyBitqueens={this.buyBitqueens}
        remQty={this.state.remQty}
        currentBitqueenPrice={this.state.currentBitqueenPrice}
        numberOfBitQueensInWallet={this.state.numberOfBitQueensInWallet}
        changeQueenNameTokenSymbol={this.state.changeQueenNameTokenSymbol}
        accumulatedCQNT={this.state.accumulatedCQNT}
      />
    }

    return (
      <div className="backgroundPaper">
        <Navbar account={this.state.account} />

        <div className="container-fluid mt-4">
          <div className="row">
            {/* <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}> */}
            <div className="content mainContainer">


              <div className="mainCenteredDiv">

                <Switch>
                  <Route exact path="/">
                    < Main
                      bitQueenSymbol={this.state.bitQueenSymbol}
                      buyBitqueens={this.buyBitqueens}
                      remQty={this.state.remQty}
                      getCurrentBitqueenPrice={this.getCurrentBitqueenPrice}
                      numberOfBitQueensInWallet={this.state.numberOfBitQueensInWallet}
                      currentBitqueenPrice={this.state.currentBitqueenPrice}
                      changeQueenNameTokenSymbol={this.state.changeQueenNameTokenSymbol}
                      totalSupply={this.state.totalSupply}
                    />
                  </Route>

                  <Route path="/gallery">
                    < Gallery />
                  </Route>

                  <Route path="/cqnt">
                    <Cqnt />
                  </Route>

                  <Route path="/wallet">
                    < Wallet
                      account={this.state.account}
                      isWeb3Browser={this.state.isWeb3Browser}
                      connectToWallet={this.connectToWallet}
                    />
                  </Route>

                  <Route path="/about">
                    < About />
                  </Route>

                  <Route path="/detail">
                    < Detail
                      account={this.state.account}
                      changeQueenName={this.changeQueenName}
                      isOwner={this.isOwner}
                      isOwnerOfToken={this.isOwnerOfToken}
                      isWeb3Browser={this.state.isWeb3Browser}

                      bitQueenContract={this.state.bitQueenContract}
                      changeQueenNameTokenContract={this.changeQueenNameTokenContract} />
                  </Route>

                  <Route path="/faq">
                    < FAQ />
                  </Route>

                  <Route path="/tc">
                    < Terms />
                  </Route>

                  <Route path="/howToBuy">
                    < HowTobuy />
                  </Route>

                  <Route path="/disclaimer">
                    < Disclaimer />
                  </Route>


                </Switch>
              </div>


            </div>

            {/* </main>  */}
          </div>
        </div>

        <Footer account={this.state.account} />

      </div>
    );
  }
}

export default App;
