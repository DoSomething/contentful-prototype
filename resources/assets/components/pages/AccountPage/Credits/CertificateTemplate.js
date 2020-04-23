import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Volunteer credit table generated 'certificatePost' prop type.
export const certificatePostType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  campaignWebsite: PropTypes.shape({
    showcaseImage: PropTypes.shape({
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    }).isRequired,
  }).isRequired,
  actionLabel: PropTypes.string.isRequired,
  dateCompleted: PropTypes.string.isRequired,
  volunteerHours: PropTypes.string.isRequired,
  impactLabel: PropTypes.string,
  photo: PropTypes.string,
  pending: PropTypes.bool.isRequired,
});

// PDF template styles.
const styles = StyleSheet.create({
  page: { backgroundColor: 'tomato' },
  section: { color: 'white', textAlign: 'center', margin: 30 },
});

// PDF template.
const CertificateTemplate = ({ certificatePost }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Certificate of Credit.</Text>
        <Text>{certificatePost.id}</Text>
      </View>
    </Page>
  </Document>
);

CertificateTemplate.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateTemplate;
