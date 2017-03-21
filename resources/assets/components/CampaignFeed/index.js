import React from 'react';
import Feed from '../Feed';
import Revealer from '../Revealer';
import Affirmation from '../Affirmation';

const BLOCKS_PER_ROW = 3;

class CampaignFeed extends React.Component {
  constructor(props) {
    super(props);

    // Intentionally not attached to the component state as
    // this property should not trigger re-renders.
    this.reportbackIndex = 0;
  }

  componentDidMount() {
    const campaignId = this.props.campaign.legacyCampaignId;
    const existingSignups = this.props.signups.data;

    if (existingSignups.indexOf(campaignId) > -1) {
      this.props.setCurrentlySignedUp(true);
    } else {
      this.props.checkForSignup(campaignId);
    }
  }

  /**
   * Map the given display option to a
   * numeric point value.
   *
   * @param {Array} displayOption
   * @return int
   */
  mapDisplayToPoints(displayOption) {
    switch (displayOption[0]) {
      case 'one-third': return 1;
      case 'two-thirds': return 2;
      case 'full': return 3;
      default: return 0;
    }
  }

  /**
   * Set root-level type property if it's a custom block.
   *
   * @param {Object} block
   */
  setType(block) {
    const type = block.type === 'customBlock' ? block.fields.type : block.type;
    block.type = type;
  }

  /**
   * If it's a reportback block, load in the requested number of reportbacks.
   *
   * @param {Object} block
   */
  appendReportbacks(block) {
    if (block.type === 'reportbacks') {
      block.reportbacks = [];

      const count = block.fields.additionalContent.count || 3;
      for (let i = 0; i < count; i++) {
        const reportback = this.props.reportbacks.data[this.reportbackIndex];

        if (reportback) {
          block.reportbacks.push(reportback);
        }

        this.reportbackIndex++;
      }
    }
  }

  /**
   * Create the feed.
   */
  generateFeed() {
    this.reportbackIndex = 0;
    let blockPoints = 0;

    return this.props.campaign.activityFeed.filter((block) => {
      blockPoints += this.mapDisplayToPoints(block.fields.displayOptions);

      const totalRows = blockPoints / BLOCKS_PER_ROW;
      const rowTarget = this.props.blocks.offset * this.props.rowsPerPage;

      if (totalRows > rowTarget) {
        return false;
      }

      this.setType(block);
      this.appendReportbacks(block);
      return true;
    });
  }

  /**
   * Build the feed revealer based on the user authentication state.
   */
  buildRevealer() {
    const authenticated = this.props.user.id !== null;
    const signedUp = this.props.signups.thisCampaign;

    const title = authenticated && signedUp ? 'view more' : 'sign up';
    const callToAction = authenticated && signedUp ? '' : this.props.campaign.callToAction;

    const onReveal = authenticated ? (
      signedUp ? this.props.clickedViewMore : () => this.props.clickedSignUp(this.props.campaign.legacyCampaignId)
    ) : () => window.location.href = '/login';

    return <Revealer title={title} onReveal={onReveal} callToAction={callToAction} />
  }

  /**
   * Build the affirmation component for this campaign
   * or null.
   */
  buildAffirmation() {
    // if (!this.props.signups.thisSession) return null;

    return (<Affirmation />);
  }

  render() {
    const blocks = this.generateFeed();
    const revealer = this.buildRevealer();
    const affirmation = this.buildAffirmation();

    return (
      <Feed blocks={blocks} revealer={revealer} affirmation={affirmation} />
    );
  }
}

CampaignFeed.defaultProps = {
  rowsPerPage: 3,
};

export default CampaignFeed;
