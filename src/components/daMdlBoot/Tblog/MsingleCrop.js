import React, {Component} from 'react';

export default class MsingleCrop extends Component {

  constructor(props) {
    super(props);
    /*
    this.state = {
      title: "2020 서울 관광 페스티벌",
      content: "본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. ",
      image: "https://cdn.pixabay.com/photo/2011/12/13/14/30/earth-11014_960_720.jpg"
    }
    */
  }
  render() {
    return (
      <div className="daMdl Tblog MsingleCrop">         
        <div className="thumb"><img src={this.props.data.image} alt={this.props.data.title} /></div>
        <div className="conA">
          <div className="inner">
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
