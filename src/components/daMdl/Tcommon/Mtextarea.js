import React, {Component} from 'react';

export default class Mtextarea extends Component {

  constructor(props) {
    super(props);
    /*
    this.state = {
      content: "본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. 반갑습니다."     
   }
   */
  }

  render() {
    return (
      <div className="daMdl Tcommon Mtextarea">
        <p>{this.props.data.content}</p>
      </div>
    );
  }
}
