import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../../helpers/display';
import { certificatePostType } from './CertificateTemplate';
import VolunteerCreditsTableRow from './VolunteerCreditsTableRow';

const TableHeader = tw.th`bg-blurple-500 font-bold p-4 pr-6 text-left text-white`;

const VolunteerCreditsTable = ({ certificatePosts }) =>
  certificatePosts.length ? (
    <table
      data-testid="user-credits-table"
      className="bg-white border border-solid border-gray-200 border-collapse w-full"
    >
      <thead>
        <tr>
          <TableHeader>Campaign Info</TableHeader>
          <Media
            query={`(min-width: ${tailwind('screens.md')})`}
            render={() => (
              <React.Fragment>
                <TableHeader>Action Type</TableHeader>
                <TableHeader>Date Completed</TableHeader>
                <TableHeader>Volunteer Hours</TableHeader>
                <TableHeader>Certificate</TableHeader>
              </React.Fragment>
            )}
          />
        </tr>
      </thead>

      <tbody>
        {certificatePosts.map(certificatePost => (
          <tr
            key={certificatePost.actionId}
            css={css`
              :not(:first-of-type) {
                border-top: 2px solid ${tailwind('colors.gray.200')};
              }
            `}
          >
            <VolunteerCreditsTableRow certificatePost={certificatePost} />
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;

VolunteerCreditsTable.propTypes = {
  certificatePosts: PropTypes.arrayOf(certificatePostType).isRequired,
};

export default VolunteerCreditsTable;
