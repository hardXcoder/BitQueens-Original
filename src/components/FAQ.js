import React from "react";
import Promo from '../images/promotional.jpg'

export default class FAQ extends React.Component {
    state = {
        loading: true,
    };

    async componentDidMount() {

    }

    render() {

        return (
            // <div className="divContent fontClass">
                            <div className="mainHomeBlock">

                <h3 className="headingMargin">What it is about ?</h3>
                <p className="paraMargin">BitQueens is the biggest NFT art project in the history of 
                    blockchain and NFT's. It's theme is based on women
                    who are backbone of this society. The name is choosen to reflect
                    that each and every women on this planet are Queens with different
                    characterstics, looks and style. So, this project is the initiative in 
                    direction of <b className="celebrate"><i>"Celebrating women through Art".</i></b>
                </p>


                <h3 className="headingMargin">How I will be eligible for BitQueens Airdrop ?</h3>
                
                <p className="paraMargin">
                    Only the BitQueens holders participating in the <b>promotional period from 
                    15 Apr - 15 May 2021,</b> will be eligile for the Airdrops scheduled below
                   </p>

                   <div>   
                    <img alt=' ' className="col-sm-12 sampleImagesDiv" src={Promo} />
                  </div>
                
                {/* Uncomment it later */}

                {/* <h3 className="headingMargin">What is the pricing model for BitQueens ?</h3>
                <p className="paraMargin">
                    The BitQueens prices are decided according to tiers, the current tier
                    price is fetched from on chain based on number of NFTs sold till now.
                    </p>
                    <div className="galleryItemContainer">
                       <div className="galleryImageContainer">
                      <img className="galleryImage" src={priceTier} />
                       </div>
                    </div> */}

            

                    <h3 className="headingMargin">How can the CQNT can be claimed ?</h3>
                <p className="paraMargin">
                    If hold any of the BitQueen NFT art in your wallet, you will be eligible to claim the 10 CQNT
                    in your wallet daily, this amount keeps on accumulating as long as you hold the NFT. But in order
                    to get into your wallet, you need to claim them. You can easily claim the CQNT 
                    by going to wallet section on bitqueens.com website.
                    </p>


                    <h3 className="headingMargin">How the random distribution of NFT works ?</h3>
                <p className="paraMargin">
                    During the promotional period of 20 days, as you buy the NFT, you will be buying a 
                    NFT art piece with a particular tokenID, but only after the sale is complete, the 
                    artwork will be assigned their actual series. The actual series will be defined on 
                    the last Art piece sale. A random number between 1-10000 will be choosen which will 
                    represent the initial starting index of the  BitQueen NFT. For example if the random 
                    number came out to be 2450, then 1st token index will be referencing to 2450 Artwork.
                    This random distrubution of Art is done to ensure the transparency during the sale period.
                    
                    </p>
                    <br>
                    </br>
                    <p>
                        After a specified time, the starting index will be announced via the twitter handle,
                        and then the artworks will be assigned their final sequence.

                    </p>

                    <h3 className="headingMargin">What is the use of CQNT token ?</h3>
                <p className="paraMargin">
                    CQNT(ChangeQueenNameToken) is a BEP-20  token, it is just used to change the NFT art
                    that you are owner of. As CQNT is BEP-20 compatible, you can transfer it between accounts.
                    </p>

                
                </div>
        );
    }
}