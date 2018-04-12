/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

import ContentfulEntryContainer from '../../ContentfulEntry/ContentfulEntryContainer';
import Modal from '../../utilities/Modal/Modal';

// Helpers:
const isModal = location => location.pathname.includes('/modal/');
const withoutModal = location =>
  location.pathname.replace(/\/modal\/[a-zA-Z0-9]*\/?/, '');

class ModalRoute extends React.Component {
  constructor(props) {
    super(props);

    this.previousLocation = withoutModal(props.location);
    this.previousScroll = 0;
  }

  componentWillUpdate(nextProps) {
    // If we're opening a modal, keep track of where we were.
    if (!isModal(this.props.location) && isModal(nextProps.location)) {
      this.previousLocation = this.props.location.pathname;
      this.previousScroll = window.scrollY;
    }
  }

  componentDidUpdate(prevProps) {
    // After closing a modal, restore scroll position. We do this in
    // `componentDidUpdate` because we need re-rendered page in place.
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

ModalRoute.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  children: PropTypes.node,
};

ModalRoute.defaultProps = {
  children: null,
};

export default ModalRoute;
