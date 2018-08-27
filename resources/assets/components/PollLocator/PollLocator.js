/* global window, document, MutationObserver */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { trackPuckEvent } from '../../helpers/analytics';

class PollLocator extends React.Component {
  componentDidMount() {
    this.addObserver();
    this.initVitScript();
  }

  componentWillUnmount() {
    // Disconnect the MutationObserver.
    this.observer.disconnect();
  }

  handleSearchButtonClick = () => {
    trackPuckEvent('phoenix_clicked_poll_locator');
  };

  /**
   * Add a MutationObserver to determine load status of the Voter Information Tool.
   */
  addObserver = () => {
    // Select the node that will be observed for mutations
    const vitNode = document.getElementById('_vit');
    // Create an observer instance linked to the callback function
    this.observer = new MutationObserver(() => {
      const searchButton = document.getElementById('submit-address-button');

      if (!searchButton) {
        return;
      }

      searchButton.addEventListener('click', this.handleSearchButtonClick);
    });
    // Start observing the target node for configured mutations
    this.observer.observe(vitNode, { childList: true });
  };

  /**
   * Append the Voter Information Tool to the DOM and add event listener for when it loads.
   */
  initVitScript = () => {
    const script = document.createElement('script');
    script.src = 'https://tool.votinginfoproject.org/app.js';
    document.head.append(script);
    script.addEventListener('load', this.loadVit);
  };

  /**
   * Call the vit.load method if the vit object has been added to the window.
   */
  loadVit = () => {
    if (!window.vit) {
      return;
    }

    window.vit.load({
      modal: true,
      officialOnly: false,
      title: 'Find Where to Vote',
      width: '640px',
      height: '350px',
      logo: '',
      colors: {
        header: '#229acd',
        landscapeBackgroundHeader: '#228a9d',
      },
      language: 'en',
      electionId: get(this.props.additionalContent, 'electionId'),
    });
  };

  render() {
    return (
      <div id="_vit" className="margin-horizontal-auto">
        {/** this spinner will be auto replaced by the vit content once it loads */}
        <div
          className="spinner -centered"
          style={{ height: 350, width: 640 }}
        />
      </div>
    );
  }
}

PollLocator.propTypes = {
  additionalContent: PropTypes.shape({
    electionId: PropTypes.number,
  }),
};

PollLocator.defaultProps = {
  additionalContent: {
    // Election ID defaults to 2000 -- the standard VIP test Election ID.
    electionId: 2000,
  },
};

export default PollLocator;
