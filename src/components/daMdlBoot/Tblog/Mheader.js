import React, {Component} from 'react';
//import Jumbotron from 'react-bootstrap/Jumbotron';
//import Button from 'react-bootstrap/Button';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
    /*
    return (
      <Jumbotron className="container">
        <strong>{this.props.data.category}</strong>
        <h1>{this.props.data.title}</h1>
        <hr className="my-4"/>
        <p>{this.props.data.content}</p>
        <ButtonGroup aria-label="Basic example">
          <Button variant="dark"><i className="xi-bookmark"></i></Button>
          <Button variant="dark"><i className="xi-link-insert"></i></Button>
          <Button variant="dark"><i className="xi-facebook"></i></Button>
        </ButtonGroup>
      </Jumbotron>
    );
    */
    return (
      <div className="jumbotron">
        <div className="container">
          <p className="lead">{this.props.data.category}</p>
          <h1 className="display-4">{this.props.data.title}</h1>
          <hr className="my-4"/>
          <p>{this.props.data.content}</p>
          <div class="btn-group" role="group" aria-label="Basic example">
            <a className="btn btn-dark" href="#" role="button"><i className="xi-bookmark"></i></a>
            <a className="btn btn-dark" href="#" role="button"><i className="xi-link-insert"></i></a>
            <a className="btn btn-dark" href="#" role="button"><i className="xi-facebook"></i></a>
          </div>
        </div>
      </div>
    );
  }
}
