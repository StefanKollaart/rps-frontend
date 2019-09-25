import React from "react";
import "./Button.scss";

class Button extends React.Component {
  render() {
    console.log(this.props);
    return (
      <button className="button__outer" onClick={this.props.clicked}>
        {this.props.title}
      </button>
    );
  }
}

export default Button;
