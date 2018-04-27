/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { MEDIA_MEDIUM_SIZE_MIN } from '../../../constants';
import NavigationLink from '../../Navigation/NavigationLink';

import './page-navigation.scss';

class PageNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.isAnimatingFrame = false;
  }

  state = {
    isStuck: true,
  };

  componentDidMount = () => {
    // @TODO: Revist setting state here after making action and
    // community pages are created for all campaigns.
    this.updateState();

    window.addEventListener('scroll', this.onScroll, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  onScroll = () => {
    if (window.innerWidth <= MEDIA_MEDIUM_SIZE_MIN) {
      return;
    }

    this.requestFrame();
  };

  requestFrame = () => {
    if (!this.isAnimatingFrame) {
      window.requestAnimationFrame(this.updateState);
    }

    this.isAnimatingFrame = true;
  };

  updateState = () => {
    this.isAnimatingFrame = false;

    if (this.node) {
      const pageNavRect = this.node.getBoundingClientRect();
      this.setState({ isStuck: pageNavRect.top <= 0 });
    }
  };

  render() {
    return (
      <div
        ref={node => (this.node = node)}
        id="page-navigation"
        className={classnames('page-navigation', {
          'is-stuck': this.state.isStuck,
        })}
      >
        <div className="wrapper">
          <div className="nav-items">
            {this.props.pages.map(page => (
              <NavigationLink key={page.id} to={page.slug}>
                {page.title}
              </NavigationLink>
            ))}
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default PageNavigation;

PageNavigation.propTypes = {
  children: PropTypes.node,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
};

PageNavigation.defaultProps = {
  children: null,
  pages: [],
};
