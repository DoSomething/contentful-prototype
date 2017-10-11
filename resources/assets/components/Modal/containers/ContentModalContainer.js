import { connect } from 'react-redux';
import { find } from 'lodash';
import ContentModal from '../configurations/ContentModal';

const mapStateToProps = (state) => {
  const contentfulId = state.modal.contentfulId;
  if (! contentfulId) {
    return null;
  }

  const database = [
    ...state.campaign.pages,
    ...state.campaign.activityFeed,
  ];

  const item = find(database, { id: contentfulId });
  if (! item) {
    return null;
  }

  const content = item.fields.content;
  if (! content) {
    return null;
  }

  const type = item.type;
  if (! type) {
    return null;
  }

  const title = item.fields.title || null;

  return { content, title, type, contentfulId };
};

export default connect(mapStateToProps)(ContentModal);
