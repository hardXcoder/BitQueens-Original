import React from 'react';

var barStyle =  {
    width : '100%',
    background : "unset",
    borderRight : "2px black solid"
}
export default class CustomProgress extends React.Component {

    render() {
        return(
            <div className= {this.props.className}>
                <div className="progressBarHeader">{this.props.total}</div>
                <progress value = {this.props.value} max = {this.props.total} style={barStyle}></progress> 
                <div className="progressBarFooter">{this.props.cost}</div>
            </div> 
        )
    }
}