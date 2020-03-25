import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { tailwind } from '../../../../helpers';
import CampaignPreview from './CampaignPreview';

// A list item displaying a Post detail and value for mobile screens.
const PostDetail = ({ detail, value }) => (
  <li className="my-2 xs:flex">
    <h4 className="m-0 font-bold text-gray-600 uppercase xs:w-1/2">{detail}</h4>
    <p className="xs:text-right xs:w-1/2">{value}</p>
  </li>
);

PostDetail.propTypes = {
  detail: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

// The certificate PDF Download button with pending and ready states.
const DownloadButton = ({ pending }) => (
  <button
    type="button"
    css={css`
      height: 65px;
      width: 150px;
    `}
    className={classNames('button', { 'is-disabled': pending })}
  >
    {pending ? 'Pending' : 'Download'}
  </button>
);

DownloadButton.propTypes = {
  pending: PropTypes.bool,
};

DownloadButton.defaultProps = {
  pending: false,
};

const TableData = tw.td`align-middle p-4 pr-6`;

const VolunteerCreditsTableRow = ({
  campaignWebsite,
  actionType,
  dateCompleted,
  volunteerHours,
}) => (
  <Media query={`(min-width: ${tailwind('screens.md')})`}>
    {matches =>
      matches ? (
        <>
          <TableData>
            <CampaignPreview campaignWebsite={campaignWebsite} />
          </TableData>
          <TableData>{actionType}</TableData>
          <TableData>{dateCompleted}</TableData>
          <TableData>{volunteerHours}</TableData>
          <TableData>
            <DownloadButton
              pending={Boolean(Math.floor(Math.random() * Math.floor(2)))}
            />
          </TableData>
        </>
      ) : (
        <TableData>
          <CampaignPreview campaignWebsite={campaignWebsite} mobile />

          <ul className="py-3 max-w-sm">
            <PostDetail detail="Action Type" value={actionType} />
            <PostDetail detail="Volunteer Hours" value={volunteerHours} />
            <PostDetail detail="Date Completed" value={dateCompleted} />
          </ul>

          <DownloadButton
            pending={Boolean(Math.floor(Math.random() * Math.floor(2)))}
          />
        </TableData>
      )
    }
  </Media>
);

VolunteerCreditsTableRow.propTypes = {
  actionType: PropTypes.string,
  campaignWebsite: PropTypes.object.isRequired,
  dateCompleted: PropTypes.string,
  volunteerHours: PropTypes.string,
};

VolunteerCreditsTableRow.defaultProps = {
  actionType: 'Share Something',
  dateCompleted: 'February 19, 2020',
  volunteerHours: '1 Hour',
};

export default VolunteerCreditsTableRow;
