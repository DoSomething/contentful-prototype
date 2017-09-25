import { connect } from 'react-redux';
import { find } from 'lodash';
import PageModal from '../configurations/PageModal';

const mapStateToProps = (state) => {
  const contentfulId = state.modal.contentfulId;
  if (! contentfulId) {
    return null;
  }

  const page = find(state.campaign.pages, { id: contentfulId });
  if (! page) {
    return null;
  }

  const content = page.fields.content;
  if (! content) {
    return null;
  }

  return { content };
};

export default connect(mapStateToProps)(PageModal);
