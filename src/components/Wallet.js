import React from "react";
import metamask from '../images/metamask5.png'
import questionMark from '../images/QuestionMark.jpeg'


import BN from 'bn.js';
import Web3 from 'web3';

import { Link } from 'react-router-dom'

import NoWallet from './NoWallet'
import Loading from './Loading'
import BitQueens from '../abis_bsc/BitQueens.json'
import ChangeQueenNameToken from '../abis_bsc/ChangeQueenNameToken.json'

import { bitqueen_contract_address, cqnt_contract_address } from '../constants'

import { getCurrentAccount, getWeb3Util } from './util'




export default class Wallet extends React.Component {

    constructor(props) {
        super(props)

        // console.log("Wallet constructor called");

        this.state = {
            claimEnabled: true,
            cqntBalance: 0,
            loading: false,
            balanceOfQueens: 0,
            numberOfCQNTInWallet: 0,
            accumulatedCQNT: 0,
            srcLinkArray: [],
            tokenIndicesArray: [],
            account: '0x0'

        }

        this.web3 = getWeb3Util();

    }

    claimCQNT = async () => {
        this.setState({ loading: true })

        await this.getTokenIndices();

        // console.log(this.state.tokenIndicesArray)

        this.changeQueenNameTokenContract.methods.claim(this.state.tokenIndicesArray).send({ from: this.state.account }).on('transactionHash', (hash) => {
         
        }).on('receipt', (receipt) => {
            window.alert("Claim successful")
            this.setState({ loading: false })
            this.updateWalletCQNT();
          })
          .on('error', (err) => {
            window.alert(err.message)
            console.log("the state in eror is :"+ this.state.loading)
            this.setState({ loading: false })

          });

    }

    getTokenIndices = async () => {
        let tokenArray = [];
        const queenBalance = await this.balanceOfQueens(this.state.account);
        const tokenIndices = JSON.parse(window.sessionStorage.getItem("tokenIndices"));

        if (tokenIndices[this.state.account]) {
            const indices = tokenIndices[this.state.account];
            for (let i = 0; i < indices.length; i++) {
                const tokenIndex = indices[i];
                tokenArray.push(tokenIndex);

                const srcLink = { id: tokenIndex, src: 'https://bitqueensdata.blob.core.windows.net/bitqueensdata/bitqueen' + tokenIndex + '.jpeg' };

                this.setState({
                    srcLinkArray: [...this.state.srcLinkArray, srcLink]
                })
            }
        } else {
            for (let i = 0; i < queenBalance; i++) {
                const tokenIndex = await this.tokenOfOwnerByIndex(this.state.account, i)
                tokenArray.push(tokenIndex);

                const srcLink = { id: tokenIndex, src: 'https://bitqueensdata.blob.core.windows.net/bitqueensdata/bitqueen' + tokenIndex + '.jpeg' };

                this.setState({
                    srcLinkArray: [...this.state.srcLinkArray, srcLink]
                })

            }
            tokenIndices[this.state.account] = tokenArray;
            window.sessionStorage.setItem("tokenIndices", JSON.stringify(tokenIndices));
        }

        this.setState({ tokenIndicesArray: tokenArray })


        //    console.log("The token Indices array is : "+ tokenArray)
        return tokenArray

    }


    tokenOfOwnerByIndex = async (address, index) => {
        const tokenIndex = await this.bitQueenContract.methods.tokenOfOwnerByIndex(address, index).call()
        return tokenIndex;
    }

    getSrcLinks = async () => {
        // var tokenIndices = await this.getTokenIndices();
        var tokenIndices = this.state.tokenIndicesArray;
        var srcArray = [];
        for (var i = 0; i < tokenIndices.length; i++) {
            //The corrwect link is bitqueensdata instead of bitqueensdat(used for not wasting bandwidth)
            srcArray.push({ id: tokenIndices[i], src: 'https://bitqueensdata.blob.core.windows.net/bitqueensdata/bitqueen' + tokenIndices[i] + '.jpeg' })
        }

        this.setState({ srcLinkArray: srcArray })
        // return srcArray;
    }

    balanceOfQueens = async (address) => {

        const balance = await this.bitQueenContract.methods.balanceOf(address).call();
        if (!balance) return 0;
        return balance;
    }
    


    getAccumulateQtyOfCQNT = async () => {


        let accumulatedCQNT = new BN(0);
        const accQty = JSON.parse(window.sessionStorage.getItem("accumulatedCqnt"));

        if (!accQty[this.state.account]) {
            for (let i = 0; i < this.state.tokenIndicesArray.length; i++) {

                const accumulutedForIndex = new BN(await this.changeQueenNameTokenContract.methods.getAccumulatedQty(this.state.tokenIndicesArray[i]).call())

                accumulatedCQNT = accumulatedCQNT.add(accumulutedForIndex)

            }
            accumulatedCQNT = Number(this.toEthUnit(accumulatedCQNT))
            // console.log("Total accumulate "+accumulatedCQNT)
            accQty[this.state.account] = accumulatedCQNT;
            window.sessionStorage.setItem("accumulatedCqnt", JSON.stringify(accQty));
        } else {
            accumulatedCQNT = accQty[this.state.account];
        }
        this.setState({ accumulatedCQNT })
        return accumulatedCQNT;
    }

    toEthUnit = wei => {
        var num = (this.web3.utils.fromWei(wei));
        var value = parseFloat(num).toFixed(2);
        return value;
    };

     accountChangeHandler = (accounts) => {
        console.log("in wallet event handler")

        this.init();

    }

    componentDidMount() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", this.accountChangeHandler)
        }
        this.init();

    }

    componentWillUnmount(){
        if(window.ethereum)
        {
            window.ethereum.removeListener("accountsChanged",this.accountChangeHandler)

        }
    }



    async updateWalletCQNT() {
        
        const tokenIndices = JSON.parse(window.sessionStorage.getItem("tokenIndices"));
        const accQty = JSON.parse(window.sessionStorage.getItem("accumulatedCqnt"));

        if(tokenIndices[this.state.account]){
            delete tokenIndices[this.state.account]
        }
        if(accQty[this.state.account]){
            delete accQty[this.state.account]
        }

        window.sessionStorage.setItem("tokenIndices", JSON.stringify(tokenIndices));
        window.sessionStorage.setItem("accumulatedCqnt", JSON.stringify(accQty));
      
        await this.init();

    }

    async init() {

        this.setState({
            claimEnabled: true,
            cqntBalance: 0,
            loading: false,
            balanceOfQueens: 0,
            numberOfCQNTInWallet: 0,
            accumulatedCQNT: 0,
            srcLinkArray: [],
            tokenIndicesArray: [],
            account: '0x0'
        })

        //Fetching the account
        const currentAccount = await getCurrentAccount();
        this.setState({ account: currentAccount })

        if (currentAccount == '0x0') {
            return;

        }
        console.log(currentAccount + "  ::: " + this.state.account)

        console.log("pre init")
        this.bitQueenContract = await new this.web3.eth.Contract(BitQueens, bitqueen_contract_address);
        this.changeQueenNameTokenContract = await new this.web3.eth.Contract(ChangeQueenNameToken, cqnt_contract_address);
        console.log("post init")

        this.setState({
            loading: true
        })

        const balanceOfQueens = await this.balanceOfQueens(this.state.account);
        this.setState({
            balanceOfQueens
        })

        this.setState({
            tokenIndicesArray: [],
            srcLinkArray: []
        })

        let numberOfCQNTInWallet = this.toEthUnit(await this.changeQueenNameTokenContract.methods.balanceOf(this.state.account).call())
        this.setState({ numberOfCQNTInWallet })

        //Fetching and setting the tokenIndicesArray (Very tedious task, need to do something)
        await this.getTokenIndices();

        //Set the accumulated qty of CQNT in state, dependency on getTokenIndices function
        await this.getAccumulateQtyOfCQNT();

        this.setState({
            loading: false
        })

    }

    updateCQNTStatus = (event) => {
        this.nctBalance = this.changeQueenNameTokenContract.methods.balanceOf().send({ from: this.state.account });


        this.setState({ loading: true })

    }

    cqntBalanceOf = () => {
        this.setState({ loading: true })
        this.cqntBalance = this.changeQueenNameTokenContract.methods.balanceOf().send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
        })
        return this.cqntBalance;
    }




    render() {

        const loading = this.state.loading;
        if (this.state.account != '0x0') {
            return (

                <div className="walletContainer">

                    <div className="accountContainer">
                        <div className="connectedStatus">

                            <h4 className="responsiveTextSize noMarginBottom">Connected</h4>

                        </div>

                        <div className="accountNumber">
                            <h6>Your account : {this.state.account}</h6>

                        </div>
                    </div>


                    <div className="parentClaimComponent">
                        {loading ?
                            (
                                <div class="claimComponent">
                                    <div className="claimDetails mb-4 border border-warning" >
                                        <p>WALLET CQNT : {this.state.numberOfCQNTInWallet}</p>
                                    </div>
                                    <Loading />
                                </div>

                            ) : (
                                <div className="claimComponent">
                                    <div className="claimDetails mb-4 border border-warning" >
                                        <p>WALLET CQNT : {this.state.numberOfCQNTInWallet}</p>
                                    </div>

                                    <div className="claimDetails mb-4 border border-warning" >
                                        <p>CLAIMABLE CQNT : {this.state.accumulatedCQNT}</p>
                                    </div>

                                    <div className="claimButtonContainer">
                                        <form className="claimButton" onSubmit={(event) => {
                                            event.preventDefault()
                                            this.claimCQNT()

                                        }}>

                                            <button type="submit" className="hotPink btn-block btn-lg responsiveTextSize" id="buttonContent">Claim CQNT</button>
                                        </form>

                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="warningClass">
                        <h5 className="isa_warning">Loading may take time, as it fetches all data from on chain</h5>
                    </div>
                    <div className="h3QueenContentDiv">

                        <h3 className="h3QueenContent responsiveTextSize noMarginBottom" >You have {this.state.balanceOfQueens} BitQueens</h3>

                    </div>

                    {/* div for showing your bitqueens */}

                    <div className="dabba">


                        {this.state.srcLinkArray.map((item, index) => (

                            <div className="galleryItemContainer">

                                {/* <Link to='/detail/${item.id}' params={item.id}> */}
                                <Link to={'/detail/' + item.id}>
                                    <div className="galleryImageContainer">
                                        {/* <img alt='' className="galleryImage" src={item.src} loading="lazy" /> */}
                                        <img alt='' className="galleryImage" src={questionMark} loading="lazy" />

                                    </div>
                                </Link>

                            </div>


                        ))}


                    </div>

                </div>
            );
        }
        else if (!this.props.isWeb3Browser) {
            return (
                <NoWallet />
            )
        }
        else {
            return (
                <div>

                    <table className="table table-borderless text-muted text-center mt-4">

                        <img src={metamask} alt="metamask" className="img-fluid" />

                    </table>
                    <div className="card mb-4" >

                        <div className="card-body">


                            <form className="mb-3" onSubmit={(event) => {
                                event.preventDefault()
                                this.props.connectToWallet()
                            }}>

                                <button type="submit" className="btn-block btn-lg" id="buttonContent">Connect Wallet</button>
                            </form>

                        </div>
                    </div>
                </div>
            );
        }

    }
}