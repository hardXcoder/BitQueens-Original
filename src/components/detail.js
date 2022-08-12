import React from "react";
import BitQueens from '../abis_bsc/BitQueens.json';
import ChangeQueenNameToken from '../abis_bsc/ChangeQueenNameToken.json'
import Loading from './Loading'
import questionMark from '../images/QuestionMark.jpeg'


import { bitqueen_contract_address, cqnt_contract_address } from '../constants'

import { getCurrentAccount, getWeb3Util } from './util'

export default class Detail extends React.Component {

  constructor(props) {
    super(props)


    this.state = {
      loading: false,
      person: null,
      imageUrl: null,
      tokenId: 0,
      tokenName: 'NoName',
      isOwner: false,
      account: "0x0"
    }
    console.log("The detail constructor is being called many times");
    // this.setState({loading: true})



    this.web3 = getWeb3Util();

  }


  accountChangeHandler = (accounts) => {
    console.log("in wallet event handler")

    this.loadData();

  }

  async componentDidMount() {

    if (window.ethereum) {
      window.ethereum.on("accountsChanged",this.accountChangeHandler)
    }



    this.loadData();


  }



  componentWillUnmount() {
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", this.accountChangeHandler)

    }
  }



  getTokenName = async (tokenId) => {


    console.log("time waste")
    console.log("The token id coming is :" + tokenId)

    try {
      return await this.bitQueenContract.methods.tokenNameByIndex(tokenId).call()
    }
    catch {

    }
    return null;
  }


  isOwnerOfToken = async (tokenId) => {

    // this.setState({ loading: true })
    console.log("toke id ism: " + tokenId)
    const bitQueenContract = await new this.web3.eth.Contract(BitQueens, bitqueen_contract_address)

    let owner = await bitQueenContract.methods.ownerOf(tokenId).call();
    console.log("The IsOwnerFunction is called from detail")
    console.log(this.state.account + " : " + owner)
    if (JSON.stringify(this.state.account).toLowerCase() === JSON.stringify(owner).toLowerCase())
      return true;
    else
      return false;

  }
  changeQueenName = async (tokenId, newName) => {

    console.log("mjawa")
    this.setState({ loading: true })

    try {
      await this.bitQueenContract.methods.changeName(tokenId, newName).send({
        from: this.state.account,
      }).on('transactionHash', (hash) => {
     
      }).on('receipt', (receipt) => {
        window.alert("Name change successful")
        this.setState({ loading: false })
        this.loadData();
      })
      .on('error', (err) => {
        console.log(err)
        this.setState({ loading: false })

      });
    }
    catch (error) {
      window.alert("Either new name not valid or name is already reserved")
      this.setState({ loading: false })

    }

  }
  async loadData() {
    var url = window.location.href;
    var urlSplit = url.split('/');
    var tokenId = urlSplit[urlSplit.length - 1];
    console.log(this.web3)

    //Fetching the account
    const currentAccount = await getCurrentAccount();
    this.setState({ account: currentAccount })

    if (this.web3.eth) {
      this.bitQueenContract = await new this.web3.eth.Contract(BitQueens, bitqueen_contract_address);
      this.changeQueenNameTokenContract = await new this.web3.eth.Contract(ChangeQueenNameToken, cqnt_contract_address);
      if (tokenId < 10000) {
        var imageUrl = 'https://bitqueensdata.blob.core.windows.net/bitqueensdata/' + tokenId + '.jpg'
        // this.setState({ imageUrl })
        // this.setState({ tokenId })
        this.setState({
          imageUrl,
          tokenId
        })
        var isOwner = await this.isOwnerOfToken(this.state.tokenId);
        this.setState({ isOwner })

        var tokenName = await this.getTokenName(tokenId);
        if (tokenName) {
          this.setState({ tokenName })
        }

        console.log("i m in willmount function" + this.state.imageUrl + " " + this.state.tokenId + " " + this.state.isOwner)
      }
    }
  }

  // same work is going in componentWillMount function
  setTokenName = async () => {

  }

  render() {



    if (this.state.isOwner) {

      return (
        <div >
          <div className="detailNameAndImage">
            <div className="h3QueenContentDiv">
              <h3 className="h3QueenContent responsiveTextSize noMarginBottom" >#{this.state.tokenId} - {this.state.tokenName} </h3>

            </div>
            <div className="detailComponent" >
              {/* <img alt='' className="detailImage" src={this.state.imageUrl} /> */}
              <img alt='' className="detailImage" src={questionMark} />


            </div>
          </div>
          <div className="detailFormChangeName">
            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let newQueenName = this.input.value
              this.changeQueenName(this.state.tokenId, newQueenName)
            }}>
              <div className="input-group mb-4 paddedClass">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="New name..."
                  required />
                <div className="input-group-append">

                </div>
              </div>
              <button type="submit" disabled={this.state.loading} className="hotPink btn-block btn-lg responsiveTextSize" id="buttonContent">Give your Queen new name!</button>

              {this.state.loading ? <Loading /> : ""}
            </form>

          </div>
          <div className="h5QueenContentDiv">
            <h5 className="h5QueenContent responsiveTextSize isa_warning">Changing Queen Name costs 915 CQNT's </h5>
          </div>

        </div>
      );
    }

    else {

      return (
        <div >
          <div className="detailNameAndImage">
            <div className="h3QueenContentDiv">
              <h3 className="h3QueenContent responsiveTextSize noMarginBottom" >#{this.state.tokenId} - {this.state.tokenName} </h3>

            </div>
            <div className="detailComponent" >
              {/* <img alt='' className="detailImage" src={this.state.imageUrl} /> */}
              <img alt='' className="detailImage" src={questionMark} />


            </div>
          </div>

          <div className="h5QueenContentDiv">
            <h5 className="h5QueenContent responsiveTextSize isa_warning">You are not the Owner of this NFT Art</h5>
          </div>

        </div>
      );

    }
  }
}