import React, {Component} from 'react';

export default class MsingleHor extends Component {

  constructor(props) {
    super(props);
    /*
    this.state = {
      title: "2020 서울 관광 페스티벌",
      content: "본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다.",
      image: "https://cdn.pixabay.com/photo/2016/03/30/18/07/laboratory-1291136_960_720.jpg"
   };
   */
  }

  render() {
    return (
      <div className="daMdl Tblog MsingleHor">
        <div className="inner">
          <div className="thumb"><img src={this.props.data.image} alt={this.props.data.title}/></div>
          <div className="conA">
            <dl className="meta">
              <dt>{this.props.data.title}</dt>
              <dd>{this.props.data.content}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }
}

