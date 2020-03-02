import React, {Component} from 'react';

export default class MdoubleCrop extends Component {

  constructor(props) {
    super(props);
    /*
    this.state = {
      childs: [
        {
          title: "2020 서울 관광 페스티벌",
          content: "본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. ",
          image: "https://image.shutterstock.com/image-photo/microscope-lab-glassware-science-laboratory-600w-530971462.jpg"
        },
        {
          title: "2019 서울 관광 페스티벌",
          content: "본문 내용이 여기 들어갑니다. 반갑습니다.본문 내용이 여기 들어갑니다. ",
          image: "https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015_960_720.jpg"
        }
      ]
    };
    */
  }

  render() {
    return (
      <div className="daMdl Tblog MdoubleCrop">
        <ul className="inner">
          {this.props.data.childs.map(child => (
          <li>
            <div className="thumb"><img src={child.image} alt={child.title}/></div>
            <div className="conA">
              <dl className="meta">
                <dt>{child.title}</dt>
                <dd>{child.content}</dd>
              </dl>
            </div>
          </li>
          ))}
        </ul>
      </div> 
    );
  }
}
