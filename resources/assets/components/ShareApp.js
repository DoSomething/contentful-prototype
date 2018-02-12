import React from 'react';
import PropTypes from 'prop-types';
import { PuckProvider, PuckConnector } from '@dosomething/puck-client';
import { Flex, FlexCell } from './Flex';
import { BlockWrapper } from './Block';
import ShareAction from './ShareAction';
import { env, query } from '../helpers';

class ShareApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hasShared: false };
    this.onShareComplete = this.onShareComplete.bind(this);
  }

  onShareComplete() {
    this.setState({ hasShared: true });
  }

  render() {
    const confirmationMessage = `Thanks for sharing and demanding representation
      in media! You're entered for the chance to win the $3000 scholarship.`;

    return this.state.hasShared ? (
      <h3 style={{ textAlign: 'center' }}>{confirmationMessage}</h3>
    ) : (
      <ShareAction
        title="Share This"
        link={query('href')}
        openModal={this.onShareComplete}
        trackEvent={this.props.trackEvent}
      />
    );
  }
}

ShareApp.propTypes = {
  trackEvent: PropTypes.func.isRequired,
};

// Connect to our "minimal" Puck engine.
const PuckShareApp = PuckConnector(ShareApp);

export default () => (
  <PuckProvider
    source="phoenix-next"
    getUser={() => query('user_id')}
    puckUrl={env('PUCK_URL')}
  >
    <Flex>
      <FlexCell>
        <BlockWrapper className="placeholder -full">
          <PuckShareApp />
        </BlockWrapper>
      </FlexCell>
    </Flex>
  </PuckProvider>
);
