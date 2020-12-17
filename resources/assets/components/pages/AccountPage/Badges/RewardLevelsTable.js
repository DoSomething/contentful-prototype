import React from 'react';
import tw from 'twin.macro';

import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';

const Table = tw.table`md:w-3/4 my-6`;
const TableHeader = tw.thead`font-bold p-4 pr-6 text-center w-full border-solid border-b-4 border-gray-400`;
const TableCellLeft = tw.td`p-3 text-sm text-left md:text-base border-solid border-b border-gray-400`;
const TableCellLeftBottom = tw.td`p-2 text-sm text-left md:text-base`;
const TableCellCenter = tw.td`p-2 text-sm text-center md:text-base border-solid border-l border-b border-gray-400 items-center justify-center`;
const TableCellCenterBottom = tw.td`p-2 text-sm text-center md:text-base border-solid border-l border-gray-400 items-center justify-center`;
const TableMarker = tw.div`bg-black rounded-full h-3 w-3 flex mx-auto`;

const RewardLevelsTable = () => {
  // @TODO: when we are ready to bring in real data from users earned badges, we will replace this variable
  const badges = 4;

  const header = (
    <TableHeader>
      <tr>
        <TableCellLeft />

        <TableCellCenter
          className={
            badges >= 2 && badges < 4 ? 'bg-teal-500 bg-opacity-25' : 'bg-white'
          }
        >
          Doer <br />{' '}
          <span className="font-normal text-xs md:text-base">2 badges</span>
        </TableCellCenter>

        <TableCellCenter
          className={
            badges >= 4 && badges < 6
              ? 'bg-purple-500 bg-opacity-25'
              : 'bg-white'
          }
        >
          SuperDoer <br />{' '}
          <span className="font-normal text-xs md:text-base">4 badges</span>
        </TableCellCenter>

        <TableCellCenter
          className={badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'}
        >
          Legend <br />{' '}
          <span className="font-normal text-xs md:text-base">6 badges</span>
        </TableCellCenter>
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
            <TableCellLeft>2x Scholarship entries</TableCellLeft>

            <TableCellCenter
              className={
                badges >= 2 && badges < 4
                  ? 'bg-teal-500 bg-opacity-25'
                  : 'bg-white'
              }
            >
              {badges >= 2 && badges < 4 ? <TableMarker /> : null}
            </TableCellCenter>

            <TableCellCenter
              className={
                badges >= 4 && badges < 6
                  ? 'bg-purple-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCellCenter
              className={
                badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'
              }
            />
          </tr>
          <tr>
            <TableCellLeft>3x Scholarship entries</TableCellLeft>

            <TableCellCenter
              className={
                badges >= 2 && badges < 4
                  ? 'bg-teal-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCellCenter
              className={
                badges >= 4 && badges < 6
                  ? 'bg-purple-500 bg-opacity-25'
                  : 'bg-white'
              }
            >
              {badges >= 4 && badges < 6 ? <TableMarker /> : null}
            </TableCellCenter>

            <TableCellCenter
              className={
                badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'
              }
            />
          </tr>
          <tr>
            <TableCellLeftBottom>4x Scholarship entries</TableCellLeftBottom>

            <TableCellCenterBottom
              className={
                badges >= 2 && badges < 4
                  ? 'bg-teal-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCellCenterBottom
              className={
                badges >= 4 && badges < 6
                  ? 'bg-purple-500 bg-opacity-25'
                  : 'bg-white'
              }
            />

            <TableCellCenterBottom
              className={
                badges >= 6 ? 'bg-yellow-500 bg-opacity-25' : 'bg-white'
              }
            >
              {badges >= 6 ? <TableMarker /> : null}
            </TableCellCenterBottom>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default RewardLevelsTable;
