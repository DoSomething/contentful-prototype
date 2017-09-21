import { connect } from 'react-redux';
import { find } from 'lodash';
import PageModal from '../configurations/PageModal';

const mapStateToProps = (state) => {
  const contentfulId = state.modal.contentfulId;
  if (! contentfulId) {
    return null;
  }

  // TODO: Search other content objects, eg: blocks

  const page = find(state.campaign.pages, { id: contentfulId });
  return page ? { content: page.fields.content } : null;
};

export default connect(mapStateToProps)(PageModal);
