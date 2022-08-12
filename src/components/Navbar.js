import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import './App.css'


class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clicked : false
    }
  }

  onMenuClick = ()=>{
    this.setState({
      clicked : !this.state.clicked
    });
  } 

  collapseNavbar = () =>{
    this.setState({
      clicked : false
    });
  }
  render() {
    return (


      <nav className="navBarItems">



        <div className="navbarLogo">

        <h3 ><Link to="/" id="liContent">BitQueens</Link></h3>
 
        </div>

        <div className="navMenuIcon"> 
            <FontAwesomeIcon 
              className ="cursorPointer"
              onClick = {this.onMenuClick}
              icon={this.state.clicked ? faTimes : faBars} 
              size = "lg"
              color = "black">
            </FontAwesomeIcon>
        </div>
          <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
            <li className = "navLinks">

              <Link to="/" id="liContent" onClick = {this.collapseNavbar}>Home</Link>
            </li>
            <li className = "navLinks">

              <Link to="/howToBuy" id="liContent" onClick = {this.collapseNavbar}>How to Buy</Link>
             </li>

            <li className = "navLinks">
              <Link to="/about" id="liContent" onClick = {this.collapseNavbar}>About</Link>
            </li>
            {/* <li className = "navLinks">
              <Link to="/gallery" id="liContent" onClick = {this.collapseNavbar}>Gallery</Link>
            </li> */}
            
            <li className = "navLinks">
              <Link to="/wallet" id="liContent" onClick = {this.collapseNavbar}>Wallet</Link>
            </li>

            {/* Uncomment this link in final sale */}
            <li className = "navLinks">
              <Link to="/cqnt" id="liContent" onClick = {this.collapseNavbar}>CQNT Token</Link>
            </li>


          </ul>
        {/* <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
          </li>
        </ul> */}

      </nav>
    );
  }
}

export default Navbar;
