import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';
import GroupSelect from './GroupSelect';
import UsaStateSelect from '../../utilities/UsaStateSelect';

// These will be re-used once we add a UsaStateSelect utility component.
const ANALYTICS_EVENT_CATEGORY = EVENT_CATEGORIES.campaignAction;
const ANALYTICS_EVENT_LABEL = 'group_finder';

const GroupFinder = ({ context, groupType, onChange }) => {
  const [groupState, setGroupState] = useState(null);

  const handleGroupSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_group`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const handleGroupStateSelectFocus = () => {
    trackAnalyticsEvent(`focused_${ANALYTICS_EVENT_LABEL}_state`, {
      action: 'field_focused',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  const handleGroupStateSelectChange = selected => {
    setGroupState(selected.abbreviation);

    trackAnalyticsEvent(`clicked_${ANALYTICS_EVENT_LABEL}_state`, {
      action: 'form_clicked',
      category: ANALYTICS_EVENT_CATEGORY,
      label: ANALYTICS_EVENT_LABEL,
      context,
    });
  };

  return (
    <>
      <div className="pb-3">
        <UsaStateSelect
          onChange={handleGroupStateSelectChange}
          onFocus={handleGroupStateSelectFocus}
        />
      </div>
      <div className="pb-3">
        <GroupSelect
          groupState={groupState}
          groupTypeId={groupType.id}
          onChange={onChange}
          onFocus={handleGroupSelectFocus}
        />
      </div>
    </>
  );
};

GroupFinder.propTypes = {
  context: PropTypes.object.isRequired,
  groupType: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GroupFinder;
