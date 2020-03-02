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
      <div classNmae="daMdl Tcommon Mbutton">
        <div classNmae="inner">
          <a classNmae="button is-primary" href={this.props.data.href}>{this.props.data.text}</a>
        </div>
      </div>
    );
  }
}