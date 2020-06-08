import React, {Component} from 'react';

export default class Mbutton extends Component {

  constructor(props) {
    super(props);
    /*
    this.state = {
      href: "/",
      text: "자세히 보기"     
   };
   */
  }

  render() {
    return (
      <div className="daMdl Tcommon Mbutton">
        <div className="inner">
          <a className="btn02 btn02_01" href={this.props.data.href}>{this.props.data.text}</a>
        </div>
      </div>
    );
  }
}