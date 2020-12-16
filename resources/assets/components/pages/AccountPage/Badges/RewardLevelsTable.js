import React from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/core';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Table = tw.table`w-full border border-solid border-gray-200`;
const TableHeader = tw.thead`bg-blurple-500 font-bold p-4 pr-6 text-left text-white w-full`;
const TableCell = tw.td`p-2 text-sm md:text-base`;

const RewardLevelsTable = () => {
  const badges = 3;

  const header = (
    <TableHeader>
      <tr>
        <TableCell />

        <TableCell>Doer</TableCell>

        <TableCell>SuperDoer</TableCell>

        <TableCell>Legend</TableCell>
      </tr>
    </TableHeader>
  );

  return (
    <div>
      <SectionHeader title="my rewards" />

      <p className="text-gray-600">
        You currently enjoy all the perks of a SuperDoer!
      </p>

      <Table>
        {header}

        <tbody data-testid="action-stats-table-body">
          <tr
            css={css`{background-color: #${badges >= 2 ? 'f4f9ff' : 'ffffff'}`}
          >
            <TableCell>2x Scholarship entries</TableCell>

            <TableCell>X</TableCell>

            <TableCell>X</TableCell>

            <TableCell>X</TableCell>
          </tr>
          <tr
            css={css`{background-color: #${badges >= 4 ? 'f4f9ff' : 'ffffff'}`}
          >
            <TableCell>3x Scholarship entries</TableCell>

            <TableCell>X</TableCell>

            <TableCell>X</TableCell>

            <TableCell>X</TableCell>
          </tr>
          <tr
            css={css`{background-color: #${badges >= 6 ? 'f4f9ff' : 'ffffff'}`}
          >
            <TableCell>4x Scholarship entries</TableCell>

            <TableCell>X</TableCell>

            <TableCell>X</TableCell>

            <TableCell>X</TableCell>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RewardLevelsTable;
