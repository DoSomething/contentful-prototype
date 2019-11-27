import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import Card from '../Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';

const ScholarshipModal = ({
  onClose,
  scholarshipAmount,
  scholarshipDeadline,
}) => (
  <Modal onClose={onClose}>
    <Card>
      <div>
        <h1 className="p-8">This is a test scholarship modal</h1>
        {scholarshipAmount ? (
          <>
            <div>Win A Scholarship</div>
            <p>${scholarshipAmount.toLocaleString()}</p>
          </>
        ) : null}
        {scholarshipDeadline ? (
          <>
            <div>Deadline</div>
            <p>{getHumanFriendlyDate(scholarshipDeadline)}</p>
          </>
        ) : null}
        <>
          <dt>Requirements</dt>
          <dd>
            <ul className="mt-2 list -compacted">
              <li>Under 26 years old</li>
              <li>No minimum GPA</li>
              <li>No essay</li>
            </ul>
          </dd>
        </>
      </div>
    </Card>
  </Modal>
);

ScholarshipModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipDeadline: PropTypes.string.isRequired,
};
export default ScholarshipModal;
