import React from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/core';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Table = tw.table`md:w-3/4`;
const TableHeader = tw.thead`font-bold p-4 pr-6 text-center w-full border-solid border-b-4 border-gray-400`;
const TableCell = tw.td`p-2 text-sm text-center md:text-base border-solid border-l border-b border-gray-400`;

const RewardLevelsTable = () => {
  const badges = 6;

  const header = (
    <TableHeader>
      <tr>
        <TableCell />

        <TableCell>
          Doer <span className="font-normal">2 badges</span>
        </TableCell>

        <TableCell>
          SuperDoer <span className="font-normal">4 badges</span>
        </TableCell>

        <TableCell>
          Legend <span className="font-normal">6 badges</span>
        </TableCell>
      </tr>
    </TableHeader>
  );

  const userLevelLabel = badgeNumber => {
    let userLevel = 'Doer';
    if (badgeNumber >= 6) {
      userLevel = 'Legend';
    } else if (badgeNumber > 2) {
      userLevel = 'SuperDoer';
    }

    return userLevel;
  };

  return (
    <div>
      <SectionHeader title="my rewards" />

      <p className="text-gray-600">
        You currently enjoy all the perks of a {userLevelLabel(badges)}!
      </p>

      <Table>
        {header}

        <tbody data-testid="action-stats-table-body">
          <tr
            css={css`{background-color: #${badges >= 2 ? 'f4f9ff' : 'ffffff'}`}
          >
            <TableCell>2x Scholarship entries</TableCell>

            <TableCell>{badges >= 2 && badges < 4 ? 'X' : null}</TableCell>

            <TableCell />

            <TableCell />
          </tr>
          <tr
            css={css`{background-color: #${badges >= 4 ? 'f4f9ff' : 'ffffff'}`}
          >
            <TableCell>3x Scholarship entries</TableCell>

            <TableCell />

            <TableCell>{badges >= 4 && badges < 6 ? 'X' : null}</TableCell>

            <TableCell />
          </tr>
          <tr
            css={css`{background-color: #${badges >= 6 ? 'f4f9ff' : 'ffffff'}`}
          >
            <TableCell>4x Scholarship entries</TableCell>

            <TableCell />

            <TableCell />

            <TableCell>{badges >= 6 ? 'X' : null}</TableCell>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RewardLevelsTable;
