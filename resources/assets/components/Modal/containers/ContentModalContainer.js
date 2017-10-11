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

/*
{
type: 'OPEN_MODAL',
modalType: 'CONTENT_MODAL',
contentfulId: '4i2roHr1VSUu8Io6OiWyE8'
}

{
type: 'OPEN_MODAL',
modalType: 'CONTENT_MODAL',
contentfulId: '24tJwKV9WgMoSmIcg2IgcE'
}

 */
