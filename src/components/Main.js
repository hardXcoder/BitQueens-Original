import React, { Component, Fragment } from "react";
import CustomProgress from "./CustomProgress";
import queen1 from "../images/queen1.jpg";
import queen2 from "../images/queen2.jpg";
import queen3 from "../images/queen3.jpg";
import queen4 from "../images/queen4.jpg";
import queen5 from "../images/queen5.jpg";
import queen6 from "../images/queen6.jpg";

// import bitqueengif from '../images/bitqueen_gif.gif'
import bitqueengif from "../images/gif_question_mark.gif";

import Profile2 from "../images/Twitter_Profile2.jpeg";
import Promo from "../images/promotional.jpg";

import Loading from "./Loading";

class Main extends Component {
  state = {
    isSaleStarted: false,
    tncChecked: false,
    imgSrc: "https://bitqueensdata.blob.core.windows.net/bitqueensdata/",
    loading: false,
  };

  toggleChecked = () => {
    this.setState({
      tncChecked: !this.state.tncChecked,
    });
  };

  getValue = (totalSupply, curLevelCapacity, bucketSize) => {
    var value = 0;

    if (totalSupply >= curLevelCapacity) value = bucketSize;
    else if (totalSupply <= curLevelCapacity - bucketSize) value = 0;
    else value = bucketSize - (curLevelCapacity - totalSupply);

    return value;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    let numberOfBitqueens = this.input.value;
    await this.props.buyBitqueens(numberOfBitqueens, () => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    return (
      <div className="mainHomeBlock">
        {/* <img alt=' ' src ="https://bitqueensdata.blob.core.windows.net/bitqueensdata/demoQueen.jpeg" /> */}

        {/* <div > */}

        <div className="experimental50">
          <div className=" mainComponentFrame">
            <img alt=" " className="mainBitqueenGif" src={bitqueengif} />
          </div>

          {/* <div > */}

          <div className="combinedIntroAndBuy">
            <div className="introContent">
              <p>
                BitQueen is an exquisite compilation of 10,000 digital art
                collectible which are created by various artists from different
                cultural backgrounds and regions. This project is inspired by
                the most unique creation of God that is Women. Each art displays
                unique women in its appearance but share commonalities of
                immense strength, passion, love and warmth. Come and let's
                <b className="celebrate">
                  <i> Celebrate Women through Art!.</i>{" "}
                </b>
                <br></br>
                <br></br>
                You don't know which Queens NFT Art be assigned to you, it will
                all be <b className="celebrate2">Random </b>
                ensuring the full transparency.
                <br></br>
                <br></br>
                {/* Get your Queen's NFT during promotional period from <b className="celebrate"><i>17th Apr - 17th May 2021</i></b>,
               and become eligible for <b className="celebrate2">NFT Airdrops</b> according to timeline below... */}
                {/* 
               Get your Queen's NFT during promotional period  <b className="celebrate"><i>21st April - 21st May</i></b>,
               and become eligible for <b className="celebrate2">NFT Airdrops</b> according to timeline below... */}
              </p>

              <br></br>
            </div>

            <div className="card buyArea buyQueens">
              <div
                className={
                  this.state.isSaleStarted
                    ? "card-body"
                    : "card-body saleNotStarted"
                }
              >
                {this.state.isSaleStarted ? (
                  <form className="mb-2" onSubmit={this.handleSubmit}>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        ref={(input) => {
                          this.input = input;
                        }}
                        className="form-control form-control-lg"
                        placeholder="Quantity.."
                        required
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          {/* <img alt=' ' src={dai} height='32' alt="" /> */}
                          &nbsp;&nbsp;&nbsp; BTQ
                        </div>
                      </div>
                    </div>

                    {this.state.loading ? (
                      <Loading>
                        <p className="mt-2">
                          Please wait while the transaction is executing
                        </p>
                      </Loading>
                    ) : (
                      <Fragment>
                        <button
                          type="submit"
                          className="hotPink btn-block responsiveTextSize btn-lg"
                          id="buttonContent"
                          disabled={
                            !this.state.tncChecked || this.state.loading
                          }
                        >
                          Get your BitQueens!
                        </button>

                        <div className="mt-3">
                          <input
                            type="checkbox"
                            defaultChecked={this.state.tncChecked}
                            onChange={this.toggleChecked}
                          />
                          <span> I agree to the terms and conditions</span>
                        </div>
                      </Fragment>
                    )}
                  </form>
                ) : (
                  <h4> Sale starting soon. Stay tuned ! </h4>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}

        {/* </div> */}

        {/* Commenting this while promotion, uncomment it later */}

        <div className="pricingInfo">
          <h3 className="celebrate">
            Only {this.props.remQty} left at {this.props.currentBitqueenPrice}{" "}
            BNB
          </h3>
        </div>

        <br></br>
        <br></br>
        <br></br>

        <h6 style={{ textAlign: "center" }}>NFTs</h6>

        <div className="progressbarDiv">
          {/* Correct the progressbar values in the getValue function its written 0 */}
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.1}
            value={this.getValue(this.props.totalSupply, 1000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.2}
            value={this.getValue(this.props.totalSupply, 2000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.3}
            value={this.getValue(this.props.totalSupply, 3000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.4}
            value={this.getValue(this.props.totalSupply, 4000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.5}
            value={this.getValue(this.props.totalSupply, 5000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.6}
            value={this.getValue(this.props.totalSupply, 6000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.7}
            value={this.getValue(this.props.totalSupply, 7000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.8}
            value={this.getValue(this.props.totalSupply, 8000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={0.9}
            value={this.getValue(this.props.totalSupply, 9000, 1000)}
          />
          <CustomProgress
            className="progressbar"
            total={1000}
            cost={1.0}
            value={this.getValue(this.props.totalSupply, 10000, 1000)}
          />
        </div>
        <h6 style={{ textAlign: "center" }}>BNB</h6>

        <br></br>
        <br></br>
        <br></br>

        {/* <div>   
              <img alt=' ' className="col-sm-12 sampleImagesDiv" src={Promo} />
            </div> */}

        <br></br>
        <br></br>
        <br></br>
        <p className="paraMargin introContent">
          Each artwork has its own personality, value and priorities in life
          governed by zodiac sign it holds. For example, the Aries woman is
          headstrong and action oriented. They have sizzling personality and
          impeccable sense of style. Out of 10,000, only 0.29% (29 in number)
          artworks belong to Capricorn family, Hence, it is the rarest of all.
          Other traits which make them unique are dresses, Accessories,
          jewellery, hair type & color, skin color and much more. Also, each of
          the artwork has beautifully designed backgrounds inspired by creative
          thoughts of human mind. Each background stores in some of the hidden
          accessories and make up essentials which are used to style different
          looks and enhance woman’s beauty giving boost to their confidence. You
          will enjoy finding them in the artworks.
        </p>

        <br></br>
        <br></br>

        <div className="row mt-4 brief-info-container">
          <div className="col-lg-4 text-center">
            {/* <img alt='' src = {this.state.imgSrc + "1.jpg"}></img> */}
            <img alt="" src={queen1}></img>

            <h6>Cultural dresses around the World</h6>
          </div>
          <div className="col-lg-4 text-center">
            {/* <img alt='' src = {this.state.imgSrc + "2.jpg"}></img> */}
            <img alt="" src={queen2}></img>

            <h6>Some Zodiac signs are more rare than others</h6>
          </div>
          <div className="col-lg-4 text-center">
            {/* <img alt='' src = {this.state.imgSrc + "3.jpg"}></img> */}
            <img alt="" src={queen3}></img>

            <h6>Creative and colourful backgrounds</h6>
          </div>
          <div className="col-lg-4 text-center">
            {/* <img alt='' src = {this.state.imgSrc + "4.jpg"}></img> */}
            <img alt="" src={queen4}></img>

            <h6>Different ornaments worn by the Queens </h6>
          </div>
          <div className="col-lg-4 text-center">
            {/* <img alt='' src = {this.state.imgSrc + "5.jpg"}></img> */}
            <img alt="" src={queen5}></img>

            <h6>Hidden accessories in the backgrounds</h6>
          </div>
          <div className="col-lg-4 text-center">
            {/* <img alt='' src = {this.state.imgSrc + "6.jpg"}></img> */}
            <img alt="" src={queen6}></img>

            <h6>Only 10,000 unique limited characters ever</h6>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <h5>BitQueen Contract Address</h5>
<a className="celebrate" href="https://bscscan.com/address/0x90706aa4b672349a0Cd81c14829Ab08f5D95a928">0x90706aa4b672349a0Cd81c14829Ab08f5D95a928</a> */}

        <br></br>
        <br></br>

        {/* <h5>CQNT Contract Address</h5>
<a className="celebrate" href="https://bscscan.com/address/0x91966FD1Da84d596e2B88b277a9eE856F4A63a55">0x91966FD1Da84d596e2B88b277a9eE856F4A63a55</a> */}

        <br></br>
        <br></br>

        <br></br>
        <br></br>

        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Main;
