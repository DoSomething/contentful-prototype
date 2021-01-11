import React from 'react';
import tw from 'twin.macro';
import { css } from '@emotion/core';

import { query } from '../../../../helpers/url';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Table = tw.table`my-6 w-full lg:w-3/4`;
const TableHeader = tw.thead`font-bold p-4 pr-6 text-center w-full border-solid border-b-4 border-gray-400`;
const TableCellLeft = tw.td`p-3 text-sm text-left md:text-base border-solid border-b border-gray-400`;
const TableCellLeftBottom = tw.td`p-3 text-sm text-left md:text-base`;
const TableCellCenter = tw.td`p-2 text-sm text-center md:text-base border-solid border-l border-b border-gray-400 align-middle`;
const TableCellCenterBottom = tw.td`p-2 text-sm text-center md:text-base border-solid border-l border-gray-400 align-middle`;
const TableMarker = tw.div`bg-black rounded-full h-3 w-3 flex mx-auto`;

const RewardLevelsTable = () => {
  // @TODO: when we are ready to bring in real data from users earned badges, we will replace this variable
  const badges = query('badges') || 4;

  const userLevelLabel = badgeNumber => {
    let userLevel;
    if (badgeNumber >= 6) {
      userLevel = 'Legend';
    } else if (badgeNumber > 3) {
      userLevel = 'SuperDoer';
    } else if (badgeNumber >= 2) {
      userLevel = 'Doer';
    }

    return userLevel;
  };

  const doerHighlight = css`
    background-color: rgba(47, 227, 218, 0.15);
  `;

  const superDoerHighlight = css`
    background-color: rgba(193, 125, 228, 0.15);
  `;

  const legendHighlight = css`
    background-color: rgba(251, 209, 51, 0.15);
  `;

  const header = (
    <TableHeader>
      <tr>
        <TableCellLeft />

        <TableCellCenter>
          <span className="px-4">Doer</span> <br />{' '}
          <span className="font-normal text-xs md:text-base">2 badges</span>
        </TableCellCenter>

        <TableCellCenter>
          SuperDoer <br />{' '}
          <span className="font-normal text-xs md:text-base">4 badges</span>
        </TableCellCenter>

        <TableCellCenter>
          Legend <br />{' '}
          <span className="font-normal text-xs md:text-base">6 badges</span>
        </TableCellCenter>
      </tr>
    </TableHeader>
  );

  return (
    <div className="pt-10">
      <SectionHeader title="my rewards" />

      <p className="text-gray-600">
        You currently enjoy all the perks of a {userLevelLabel(badges)}!
      </p>

      <Table>
        <colgroup>
          <col />

          <col css={userLevelLabel(badges) === 'Doer' ? doerHighlight : null} />

          <col
            css={
              userLevelLabel(badges) === 'SuperDoer' ? superDoerHighlight : null
            }
          />

          <col
            css={userLevelLabel(badges) === 'Legend' ? legendHighlight : null}
          />
        </colgroup>

        {header}

        <tbody data-testid="rewards-levels-table-body">
          <tr className="w-full">
            <TableCellLeft>2x Scholarship entries</TableCellLeft>

            <TableCellCenter>
              <TableMarker />
            </TableCellCenter>

            <TableCellCenter />

            <TableCellCenter />
          </tr>

          <tr className="w-full">
            <TableCellLeft>3x Scholarship entries</TableCellLeft>

            <TableCellCenter />

            <TableCellCenter>
              <TableMarker />
            </TableCellCenter>

            <TableCellCenter />
          </tr>

          <tr className="w-full">
            <TableCellLeftBottom>4x Scholarship entries</TableCellLeftBottom>

            <TableCellCenterBottom />

            <TableCellCenterBottom />

            <TableCellCenterBottom>
              <TableMarker />
            </TableCellCenterBottom>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RewardLevelsTable;
