import React from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/core';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Table = tw.table`md:w-3/4 my-6`;
const TableHeader = tw.thead`font-bold p-4 pr-6 text-center w-full border-solid border-b-4 border-gray-400`;
const TableCell = tw.td`p-2 text-sm text-center md:text-base border-solid border-l border-b border-gray-400`;

const RewardLevelsTable = () => {
  const badges = 6;

  const header = (
    <TableHeader>
      <tr>
        <TableCell />

        <TableCell
          className={
            badges >= 2 && badges < 4 ? 'bg-teal-500 bg-opacity-25' : 'bg-white'
          }
        >
          Doer <span className="font-normal">2 badges</span>
        </TableCell>

        <TableCell
          className={
            badges >= 4 && badges < 6
              ? 'bg-purple-500 bg-opacity-25'
              : 'bg-white'
          }
        >
          SuperDoer <span className="font-normal">4 badges</span>
        </TableCell>

        <TableCell
          className={badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'}
        >
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
    <div className="pt-10">
      <SectionHeader title="my rewards" />

      <p className="text-gray-600">
        You currently enjoy all the perks of a {userLevelLabel(badges)}!
      </p>

      <Table>
        {header}

        <tbody data-testid="action-stats-table-body">
          <tr>
            <TableCell>2x Scholarship entries</TableCell>

            <TableCell
              className={
                badges >= 2 && badges < 4
                  ? 'bg-teal-500 bg-opacity-25'
                  : 'bg-white'
              }
            >
              {badges >= 2 && badges < 4 ? 'X' : null}
            </TableCell>

            <TableCell
              className={
                badges >= 4 && badges < 6
                  ? 'bg-purple-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCell
              className={
                badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'
              }
            />
          </tr>
          <tr>
            <TableCell>3x Scholarship entries</TableCell>

            <TableCell
              className={
                badges >= 2 && badges < 4
                  ? 'bg-teal-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCell
              className={
                badges >= 4 && badges < 6
                  ? 'bg-purple-500 bg-opacity-25'
                  : 'bg-white'
              }
            >
              {badges >= 4 && badges < 6 ? 'X' : null}
            </TableCell>

            <TableCell
              className={
                badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'
              }
            />
          </tr>
          <tr>
            <TableCell>4x Scholarship entries</TableCell>

            <TableCell
              className={
                badges >= 2 && badges < 4
                  ? 'bg-teal-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCell
              className={
                badges >= 4 && badges < 6
                  ? 'bg-purple-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCell
              className={
                badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'
              }
            >
              {badges >= 6 ? 'X' : null}
            </TableCell>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RewardLevelsTable;
