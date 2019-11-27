import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import Card from '../Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';

const ScholarshipModal = ({
  actionType,
  affiliateLogo,
  affiliateTitle,
  onClose,
  scholarshipAmount,
  scholarshipDeadline,
}) => (
  <Modal onClose={onClose}>
    <Card>
      <div>
        {affiliateLogo ? (
          <img
            className="affiliate-logo"
            src={affiliateLogo.url}
            alt={affiliateLogo.description || 'Affiliate logo'}
          />
        ) : null}
        <h1 className="p-8">This is a test scholarship modal</h1>
        <p className="pt-6 pb-3">
          <strong>
            Welcome to DoSomething.org
            {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
          </strong>{' '}
          Ready to earn scholarships for doing good? Just follow the simple
          instructions for the chance to win. Let’s Do This!
        </p>
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
        {actionType ? (
          <>
            <dt>Action Type</dt>
            <dd>{actionType}</dd>
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
  actionType: PropTypes.string,
  affiliateLogo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  affiliateTitle: PropTypes.string,
  onClose: PropTypes.bool.isRequired,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipDeadline: PropTypes.string.isRequired,
};

ScholarshipModal.defaultProps = {
  actionType: null,
  affiliateLogo: null,
  affiliateTitle: null,
};
export default ScholarshipModal;
