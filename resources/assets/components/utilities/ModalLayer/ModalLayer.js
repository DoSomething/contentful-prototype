/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';

import ContentfulEntryContainer from '../../ContentfulEntry/ContentfulEntryContainer';
import Modal from '../../utilities/Modal/Modal';

// Helpers:
const isModal = location => location.pathname.includes('/modal/');
const withoutModal = location =>
  location.pathname.replace(/\/modal\/[a-zA-Z0-9]*\/?/, '');

class ModalLayer extends React.Component {
  constructor(props) {
    super(props);

    this.previousLocation = withoutModal(props.location);
    this.previousScroll = 0;
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;

    // If we're opening a modal, keep track of where we were:
    if (!isModal(this.props.location) && isModal(nextProps.location)) {
      this.previousLocation = location.pathname;
      this.previousScroll = window.scrollY;
    }
  }

  componentDidUpdate(prevProps) {
    if (isModal(prevProps.location) && !isModal(this.props.location)) {
      window.scroll(0, this.previousScroll);
    }
  }

  render() {
    const { match, history, location, children } = this.props;

    return (
      <div>
        <Route
          path={`${match.url}/modal/:id`}
          render={routingProps => (
            <Modal onClose={() => history.push(this.previousLocation)}>
              <ContentfulEntryContainer id={routingProps.match.params.id} />
            </Modal>
          )}
        />
        {isModal(location) ? (
          <StaticRouter location={withoutModal(location)} context={{}}>
            <div>{children}</div>
          </StaticRouter>
        ) : (
          <div>{children}</div>
        )}
      </div>
    );
  }
}

ModalLayer.propTypes = {
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

ModalLayer.defaultProps = {
  children: null,
};

export default ModalLayer;
