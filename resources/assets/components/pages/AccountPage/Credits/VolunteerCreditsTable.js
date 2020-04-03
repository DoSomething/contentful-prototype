import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../../helpers';
import VolunteerCreditsTableRow from './VolunteerCreditsTableRow';

const TableHeader = tw.th`bg-blurple-500 font-bold p-4 pr-6 text-left text-white`;

const VolunteerCreditsTable = ({ posts }) =>
  posts.length ? (
    <table className="border border-solid border-gray-200 border-collapse w-full">
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
        {posts.map(post => (
          <tr
            key={post.id}
            css={css`
              :not(:first-of-type) {
                border-top: 2px solid ${tailwind('colors.gray.200')};
              }
            `}
          >
            <VolunteerCreditsTableRow {...post} />
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;

VolunteerCreditsTable.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VolunteerCreditsTable;
