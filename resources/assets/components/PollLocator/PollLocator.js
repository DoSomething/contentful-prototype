/* global window, document, MutationObserver */
import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { trackAnalyticsEvent } from '../../helpers/analytics';

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
    trackAnalyticsEvent({
      metadata: {
        category: 'campaign_action',
        noun: 'poll_locator',
        target: 'button',
        verb: 'clicked',
      },
    });
  };

  /**
   * Add a MutationObserver to determine load status of the Voter Information Tool.
   */
  addObserver = () => {
    // Select the node that will be observed for mutations
    const vitNode = document.getElementById('_vit');

    // Create an observer instance linked to the callback function
    this.vitObserver = new MutationObserver(() => {
      const addressNotFoundModal = document
        .getElementById('_vit')
        .querySelector('#address-not-found');
      if (get(addressNotFoundModal, 'style.display') === 'block') {
        trackAnalyticsEvent({
          metadata: {
            adjective: 'poll_locator_not_found',
            category: 'modal',
            label: 'poll_locator',
            noun: 'modal',
            target: 'modal',
            verb: 'opened',
          },
        });
      }

      const searchButton = document.getElementById('submit-address-button');

      if (!searchButton) {
        return;
      }

      searchButton.addEventListener('click', this.handleSearchButtonClick);
    });

    // Start observing the target node for configured mutations
    this.vitObserver.observe(vitNode, { childList: true, subtree: true });

    this.vitModalObserver = new MutationObserver(() => {
      const modal = document.querySelector('html > #_vitModal');
      if (modal) {
        trackAnalyticsEvent({
          metadata: {
            adjective: 'poll_locator',
            category: 'modal',
            label: 'poll_locator',
            noun: 'modal',
            target: 'modal',
            verb: 'opened',
          },
        });
      }
    });

    this.vitModalObserver.observe(document.querySelector('html'), {
      childList: true,
    });
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

    let vitConfig = {
      modal: true,
      officialOnly: false,
      title: 'Find Where to Vote',
      width: '640px',
      height: '520px',
      logo: 'http://forge.dosomething.org/resources/ds-logo-highres.png',
      colors: {
        header: '#ad1b1b',
        landscapeBackgroundHeader: '#8d1919',
      },
      language: 'en',
    };

    const electionId = get(this.props.additionalContent, 'electionId');

    if (electionId) {
      vitConfig = {
        ...vitConfig,
        electionId,
      };
    }

    window.vit.load(vitConfig);
  };

  render() {
    return (
      <div id="_vit" className="mx-auto">
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
    electionId: null,
  },
};

export default PollLocator;
