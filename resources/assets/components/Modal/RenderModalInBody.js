/* global document, window */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

/**
 * Renders the modal outside the normal React tree so scroll behavior is correct.
 * Referenced from here: http://jamesknelson.com/rendering-react-components-to-the-document-body/
 * Did some renaming and some of the function usage was deprecated.
 */

class RenderModalInBody extends React.Component {
  componentDidMount() {
    this.modal = document.createElement('div');
    document.body.appendChild(this.modal);

    this.renderComponent();
  }

  componentDidUpdate() {
    this.renderComponent();
  }

  componentWillUnMount() {
    this.renderComponent();
  }

  renderComponent() {
    if (this.props.shouldShowModal) {
      const component = (
        <Provider store={window.reduxStore}>
          { this.props.children }
        </Provider>
      );

      ReactDOM.render(component, this.modal);
    } else {
      ReactDOM.unmountComponentAtNode(this.modal);
    }
  }

  render() {
    return <div />;
  }
}

RenderModalInBody.propTypes = {
  children: PropTypes.node,
  shouldShowModal: PropTypes.bool.isRequired,
};

RenderModalInBody.defaultProps = {
  children: null,
};

export default RenderModalInBody;
