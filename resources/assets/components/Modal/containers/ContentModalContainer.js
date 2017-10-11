import { connect } from 'react-redux';
import { find } from 'lodash';
import ContentModal from '../configurations/ContentModal';

const mapStateToProps = (state) => {
  const contentfulId = state.modal.contentfulId;
  if (! contentfulId) {
    return null;
  }

  const database = {
    ...state.campaign.pages,
    ...state.campaign.activityFeed,
  };

  const page = find(database, { id: contentfulId });
  if (! page) {
    return null;
  }

  const content = page.fields.content;
  if (! content) {
    return null;
  }

  return { content };
};

export default connect(mapStateToProps)(ContentModal);
