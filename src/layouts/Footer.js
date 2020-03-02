
import React, { Component } from 'react';

export default class Footer extends Component {
  /*
  constructor() {
    super()
    this.state = {
      pictures: [],
    }
  }*/

  render() {
  	return (
      <footer>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand mx-auto" href="#">Copyright © 2020 두루미 Inc.</a>
        </nav>
      </footer>
    )
  }
}

