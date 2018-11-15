/* global window */

import React from 'react';
import { get } from 'lodash';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = get(window.HOMEPAGE, 'fields', {});
  }

  render() {
    return this.state.title ? <h1>{this.state.title}</h1> : null;
  }
}

export default HomePage;
