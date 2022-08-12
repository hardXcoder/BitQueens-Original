import React from "react";
import {Link } from 'react-router-dom'

import questionMark from '../images/QuestionMark.jpeg'


export default class Gallery extends React.Component {
  state = {
    loading: true,
    person: null,
    pageLimit: 20,
    currentPage: 1,
    totalItemsList: [],
    viewItemsList:[],
    itemList: [],
    hasMore: false,
  };

  lastBitQueen = (node =>{
    this.lastBitQueenRef = node;
    if(this.observer) {
      this.observer.disconnect();
    }else {
      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this)
      )
    }
    if(node) {
      this.observer.observe(node);
    }
  })

  async componentDidMount() {
    //fetch when filter support is there;
    for(let i=1;i<=10000;i++) {
      this.state.totalItemsList.push({
        id: i,
        // src: 'https://bitqueensdata.blob.core.windows.net/bitqueensdata/' +i+'.jpg'
        src: 'https://bitqueensdata.blob.core.windows.net/bitqueensdata/QuestionMark.jpeg'

      })
    }

    this.updateQueens();

  }

  updateQueens() {
    if(this.state.totalItemsList.length === this.state.viewItemsList.length) {
      return;
    }
    let start = (this.state.currentPage-1)*this.state.pageLimit;
    let newItems = [];
    //let total = this.state.totalItemsList.map( item => item).length();
    for(let i= start;i<Math.min(start+this.state.pageLimit,this.state.totalItemsList.length);i++) {
      newItems.push(this.state.totalItemsList[i]);
    }

  this.setState({
      viewItemsList : [...this.state.viewItemsList,...newItems]
    })
  this.setState({
    currentPage : this.state.currentPage+1
  })

  }

  handleObserver(entries , observer) {
    if(entries[0].isIntersecting) {
      // console.log("Reached last image");
      setTimeout(()=>{
        this.updateQueens();
      },700)
    }
  }
  
  render() {
    // if (this.state.loading) {
    //   return <div>loading...</div>;
    // }

    // if (!this.state.person) {
    //   return <div>didn't get a person</div>;
    // }

    return (
      <div className="mainGalleryDiv">


          <h3 className="numberBitqueens cyan responsiveTextSize">Full Gallery will be available on sale start </h3>

        <div className="dabba">
        

            {this.state.viewItemsList.map((item,index) =>{
              if(this.state.viewItemsList.length === index+1) {
                return (
                  <div className="galleryItemContainer" ref={this.lastBitQueen}>

                  {/* <Link to='/detail/${item.id}' params={item.id}> */}
                  <Link to={'/detail/'+item.id}>
                  <div className="galleryImageContainer">
                    {/* <img alt='' className="galleryImage" src={item.src} loading="lazy" /> */}
                    <img alt='' className="galleryImage" src={questionMark} loading="lazy" />

                  </div>
                  </Link>
                  </div> 
                )
              } else {
              return (
              <div className="galleryItemContainer">

                {/* <Link to='/detail/${item.id}' params={item.id}> */}
                <Link to={'/detail/'+item.id}>
                <div className="galleryImageContainer">
                  <img alt='' className="galleryImage" src={item.src} loading="lazy" />
                  <img alt='' className="galleryImage" src={questionMark} loading="lazy" />

                </div>
                </Link>
  
              </div>
              )
              }
            })}

        </div>
      </div>
    );
  }
}