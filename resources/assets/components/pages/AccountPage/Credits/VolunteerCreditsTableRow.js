import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import PropTypes from 'prop-types';

import CampaignPreview from './CampaignPreview';
import { tailwind } from '../../../../helpers/display';
import { certificatePostType } from './CertificateTemplate';
import CertificateDownloadButton from './CertificateDownloadButton';

// A list-item displaying a Post detail and value.
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

const TableData = tw.td`align-middle p-4 pr-6`;

const VolunteerCreditsTableRow = ({ certificatePost }) => {
  const {
    campaignWebsite,
    actionLabel,
    dateCompleted,
    volunteerHours,
  } = certificatePost;

  return (
    <Media query={`(min-width: ${tailwind('screens.md')})`}>
      {matches =>
        matches ? (
          <>
            <TableData>
              <CampaignPreview campaignWebsite={campaignWebsite} />
            </TableData>
            <TableData>{actionLabel}</TableData>
            <TableData>{dateCompleted}</TableData>
            <TableData>{volunteerHours}</TableData>
            <TableData>
              <CertificateDownloadButton certificatePost={certificatePost} />
            </TableData>
          </>
        ) : (
          <TableData>
            <CampaignPreview campaignWebsite={campaignWebsite} />

            <ul className="py-5">
              <PostDetail detail="Action Type" value={actionLabel} />
              <PostDetail detail="Volunteer Hours" value={volunteerHours} />
              <PostDetail detail="Date Completed" value={dateCompleted} />
            </ul>

            <CertificateDownloadButton certificatePost={certificatePost} />
          </TableData>
        )
      }
    </Media>
  );
};

VolunteerCreditsTableRow.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default VolunteerCreditsTableRow;
