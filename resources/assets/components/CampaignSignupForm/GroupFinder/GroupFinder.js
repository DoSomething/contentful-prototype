import React from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import GroupSelect from './GroupSelect';

// These will be re-used once we add a UsaStateSelect utility component.
const ANALYTICS_EVENT_CATEGORY = EVENT_CATEGORIES.campaignAction;
const ANALYTICS_EVENT_LABEL = 'group_finder';

const GroupFinder = ({ context, groupType, onChange }) => {
  const handleGroupSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_group`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  return (
    <div className="pb-3">
      <GroupSelect
        groupTypeId={groupType.id}
        onChange={onChange}
        onFocus={handleGroupSelectFocus}
      />
    </div>
  );
};

GroupFinder.propTypes = {
  context: PropTypes.object.isRequired,
  groupType: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupFinder;
