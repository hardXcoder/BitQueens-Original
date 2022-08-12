import React from "react";
import connectBinance from '../images/connectBinance.png'



export default class HowTobuy extends React.Component {
    state = {
        loading: true,
        person: null
    };

    async componentDidMount() {

    }

    render() {

        return (
            <div className="mainHomeBlock">


                <h3 className="headingMargin">How to buy</h3>

                <p className="paraMargin">
                    Connect your metamask account to Binance Chain.
               </p>

               
               <p className="paraMargin">
                   Instead of connecting to Ethereum Mainnet, choose the Custom RPC and add following details.
               </p>
                       

               <img src={connectBinance} alt="metamask" className="img-fluid" />
               <p className="paraMargin">
                   Add some BNB in your account wallet to buy your BitQueens NFT Art.
               </p>
               <br></br>
              <p>Refer to this <a className="celebrate" href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain">document</a> for more information </p>

                
            </div>
        );
    }
}