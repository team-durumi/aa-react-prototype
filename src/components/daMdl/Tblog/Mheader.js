import React, {Component} from 'react';

export default class Mheader extends Component {

  constructor(props) {
    super(props);
    /*
    this.state = {
      category: "경제",
      title: "2020 서울 관광 페스티벌",
      content: "본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다."
    };

    this.state = this.props.data;
    */
  }

  render() {
    return (
      <div className="daMdl Tblog Mheader">
        <div className="inner">
          <div className="titleA">
            <strong>{this.props.data.category}</strong>
            <h1>{this.props.data.title}</h1>
          </div>
          <div className="descA">
            <p>{this.props.data.content}</p>
            <ul className="sns">
              <li className="bk"><a href="#" title="즐겨찾기"><i className="xi-bookmark"></i></a></li>
              <li className="link"><a href="#" title="링크공유"><i className="xi-link-insert"></i></a></li>
              <li className="fb"><a href="#" title="페이스북"><i className="xi-facebook"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
