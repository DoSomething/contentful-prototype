import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

import { tailwind } from '../../../../helpers';
import CampaignPreview from './CampaignPreview';

// PDF template styles.
const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { color: 'white', textAlign: 'center', margin: 30 },
});

// PDF template.
const PdfTemplate = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Certificate of Credit.</Text>
      </View>
    </Page>
  </Document>
);

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

// The certificate PDF Download button with pending/ready state.
const buttonClassNames = 'btn w-full py-4 text-lg';
const DownloadButton = ({ pending }) =>
  pending ? (
    <button type="button" disabled className={buttonClassNames}>
      Pending
    </button>
  ) : (
    <PDFDownloadLink
      document={<PdfTemplate />}
      fileName="dosomething-volunteer-credit-certificate.pdf"
      className={classNames(
        buttonClassNames,
        'hover:bg-blue-300 hover:no-underline hover:text-white',
      )}
    >
      Download
    </PDFDownloadLink>
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
  actionLabel,
  dateCompleted,
  volunteerHours,
  pending,
}) => (
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
            <DownloadButton pending={pending} />
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

          <DownloadButton pending={pending} />
        </TableData>
      )
    }
  </Media>
);

VolunteerCreditsTableRow.propTypes = {
  actionLabel: PropTypes.string.isRequired,
  campaignWebsite: PropTypes.object.isRequired,
  dateCompleted: PropTypes.string.isRequired,
  volunteerHours: PropTypes.string.isRequired,
  pending: PropTypes.bool.isRequired,
};

export default VolunteerCreditsTableRow;
