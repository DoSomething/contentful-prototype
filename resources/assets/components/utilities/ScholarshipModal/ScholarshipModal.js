import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import Card from '../Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';
import DoSomethingLogo from '../DoSomethingLogo/DoSomethingLogo';

const ScholarshipModal = ({
  affiliateSponsors,
  actionType,
  affiliateTitle,
  onClose,
  scholarshipAmount,
  scholarshipCallToAction,
  scholarshipDeadline,
  scholarshipDescription,
}) => (
  <Modal onClose={onClose}>
    <Card>
      <div>
        <h1 className="p-8">This is a test scholarship modal</h1>
        {affiliateSponsors.length ? (
          <div className="__image">
            <DoSomethingLogo />
            <img
              src={affiliateSponsors[0].fields.logo.url}
              alt={affiliateSponsors[0].fields.logo.title}
            />
          </div>
        ) : null}
        <p className="pt-6 pb-3">
          <strong>
            Welcome to DoSomething.org
            {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
          </strong>{' '}
          {scholarshipDescription}
        </p>
        {scholarshipAmount && scholarshipCallToAction ? (
          <>
            <div>{scholarshipCallToAction}</div>
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
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateTitle: PropTypes.string,
  onClose: PropTypes.bool.isRequired,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipCallToAction: PropTypes.string,
  scholarshipDeadline: PropTypes.string.isRequired,
  scholarshipDescription: PropTypes.string,
};

ScholarshipModal.defaultProps = {
  actionType: null,
  affiliateSponsors: [],
  affiliateTitle: null,
  scholarshipCallToAction: null,
  scholarshipDescription: null,
};
export default ScholarshipModal;
