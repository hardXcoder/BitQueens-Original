import React from "react";

export default class Cqnt extends React.Component {
    state = {
        loading: true,
        person: null
    };

    async componentDidMount() {

    }

    render() {

        return (
            // <div className="divContent fontClass">
                            <div className="mainHomeBlock">

                <h3 className="headingMargin">What is CQNT ?</h3>
                <p className="paraMargin">CQNT is Change Queen Name token which is the ERC-20
                token used for naming the Queen NFT art piece.
                Every time you want to change the name of Queen, it requires 915 CQNT. As 
                CQNT token are ERC-20 compatible, hence can be transferred beween compatible wallets.
                </p>

                <h3  className="headingMargin">Distribution of CQNT</h3>
                <p className="paraMargin">When you buy and hold the BitQueens NFT art piece in 
                your wallet, each day 10 CQNT are dropped to your account. You need to to claim
                to be available in your wallet. If you dont want to claim CQNT everyday, they 
                on accumulating in your account and you can claim any day you wish to claim.
                Please not the CQNT token will not be distributed to other than holders of BitQueens.
                </p>

                <h3 className="headingMargin">Till when CQNT are dropped </h3>
                <p className="paraMargin">The timeperiod for which the CQNT will be airdropped to the
                holders of BitQueens in 10 years. After that there will be no more CQNT minted and 
                the CQNT will gets burn each time the BitQueens name is changed, day by day leading 
                to it's circulating supply getting low.
                </p>

            </div>
        );
    }
}