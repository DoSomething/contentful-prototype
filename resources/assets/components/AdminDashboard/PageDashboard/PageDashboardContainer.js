import { get } from 'lodash';
import { connect } from 'react-redux';

import PageDashboard from './PageDashboard';

const mapStateToProps = state => ({
  slug: get(state, 'page.fields.slug'),
});

export default connect(mapStateToProps)(PageDashboard);
