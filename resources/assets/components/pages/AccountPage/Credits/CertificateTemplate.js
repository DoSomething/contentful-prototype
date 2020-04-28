import React from 'react';
import PropTypes from 'prop-types';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

import doSomethingLogo from './dosomething-logo.jpg';
import leagueGothic from '../../../../fonts/leaguegothic-regular.woff';
import certificateTitle from './volunteer-credit-certificate-title.jpg';
import sourceSansPro from '../../../../fonts/sourcesanspro-regular.woff';
import sourceSansProBold from '../../../../fonts/sourcesanspro-bold.woff';
import sourceSansProItalic from '../../../../fonts/sourcesanspro-italic.woff';

// Volunteer credit table generated 'certificatePost' prop type.
export const certificatePostType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  campaignWebsite: PropTypes.shape({
    showcaseTitle: PropTypes.string.isRequired,
    showcaseDescription: PropTypes.string.isRequired,
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

// Fonts need to be explicitly registered with the PDF renderer.
Font.register({
  family: 'Source Sans Pro',
  fonts: [
    { src: sourceSansPro },
    {
      src: sourceSansProBold,
      fontWeight: 700,
    },
    {
      src: sourceSansProItalic,
      fontStyle: 'italic',
    },
  ],
});

Font.register({
  family: 'League Gothic',
  src: leagueGothic,
  fontWeight: 400,
  fontStyle: 'normal',
});

// PDF colors config.
const colors = {
  lightBlue: '#5fc6c8',
  darkBlue: '#3b3d98',
  purple: '#864f9f',
};

// PDF template styles.
const styles = StyleSheet.create({
  flex: { display: 'flex', flexDirection: 'row' },
  postDetailsTitle: {
    fontWeight: 'bold',
    color: colors.purple,
    textTransform: 'uppercase',
  },
});

// We're still stubbing the data for now so:
// eslint-disable-next-line no-unused-vars
const CertificateTemplate = ({ certificatePost }) => (
  <Document>
    <Page
      orientation="landscape"
      size="letter"
      style={{ fontSize: 15, fontFamily: 'Source Sans Pro' }}
    >
      <View
        style={{
          border: `11 solid ${colors.lightBlue}`,
          height: '100%',
          paddingHorizontal: 65,
        }}
      >
        <View
          style={[styles.flex, { justifyContent: 'center', marginTop: 30 }]}
        >
          <View>
            <Image src={doSomethingLogo} style={{ height: 55, width: 65 }} />
          </View>

          <View style={{ alignSelf: 'center' }}>
            <Text style={{ paddingLeft: 20, fontWeight: 'bold', fontSize: 24 }}>
              &#43;
            </Text>
          </View>
          <View>
            {/* @TODO add the campaign sponsor here as an Image */}
            <Text
              style={{
                marginLeft: 20,
                border: '1 solid black',
                height: 55,
                width: 65,
                fontSize: 10,
                textAlign: 'center',
              }}
            >
              Sponsor logo
            </Text>
          </View>
        </View>

        <Image style={{ marginTop: 15 }} src={certificateTitle} />

        <View style={{ textAlign: 'center', marginTop: -25 }}>
          <Text>DoSomething.org certifies that</Text>
          <Text
            style={{
              fontSize: 35,
              fontFamily: 'League Gothic',
              color: colors.purple,
            }}
          >
            Brent From-Work
          </Text>
          <Text style={{ marginTop: 5 }}>
            has completed the following volunteering campaign:
          </Text>
        </View>

        <View
          style={[
            styles.flex,
            {
              border: `2 solid ${colors.lightBlue}`,
              marginTop: 15,
              lineHeight: 1.1,
            },
          ]}
        >
          <Image
            style={{
              width: '24%',
              borderRight: `2 solid ${colors.lightBlue}`,
            }}
            src={certificatePost.photo}
          />

          <View style={{ width: '75%', padding: '10 0 15 30' }}>
            <Text
              style={{
                fontSize: 25,
                textTransform: 'uppercase',
                fontFamily: 'League Gothic',
                color: colors.darkBlue,
              }}
            >
              {certificatePost.campaignWebsite.showcaseTitle}
            </Text>

            {/* @TODO adjust font size if character count is greater then 100 */}
            <Text style={{ fontStyle: 'italic' }}>
              {certificatePost.campaignWebsite.showcaseDescription}
            </Text>

            <View style={{ fontSize: 13 }}>
              <View style={[styles.flex, { marginTop: 10 }]}>
                <View style={{ width: '40%' }}>
                  <Text style={styles.postDetailsTitle}>Date Completed</Text>
                  <Text>{certificatePost.dateCompleted}</Text>
                </View>

                <View>
                  <Text style={styles.postDetailsTitle}>Volunteer Hours*</Text>
                  <Text>{certificatePost.volunteerHours}</Text>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.postDetailsTitle}>Impact</Text>
                <Text>{certificatePost.impactLabel}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ fontSize: 10, marginTop: 20, lineHeight: 1.1 }}>
          <View style={styles.flex}>
            <View style={{ width: '50%' }}>
              <Text>[signature]</Text>
            </View>

            <View style={{ width: '50%' }}>
              <Text style={{ textAlign: 'right' }}>
                Learn more about the DoSomething Volunteer{'\n'} Credit program
                at
                <Text style={{ fontWeight: 'bold' }}>
                  {' '}
                  dosomething.org/volunteer
                </Text>
              </Text>
            </View>
          </View>

          <View style={[styles.flex, { lineHeight: 1.1 }]}>
            <View style={{ width: '50%' }}>
              <Text style={{ marginTop: 10, fontWeight: 'bold' }}>
                Maddy Allison
              </Text>
              <Text style={{ fontStyle: 'italic' }}>
                Community Associate, DoSomething.org
              </Text>
            </View>

            <View style={{ width: '50%' }}>
              <Text style={{ marginTop: 10, textAlign: 'right' }}>
                For questions and verification issues, please reach out to Maddy
                {'\n'} at{' '}
                <Text style={{ fontWeight: 'bold' }}>
                  volunteer@dosomething.org
                </Text>{' '}
                or call{' '}
                <Text style={{ fontWeight: 'bold' }}>(212)-254-2390</Text>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.flex,
            { marginTop: 20, marginBottom: 10, justifyContent: 'center' },
          ]}
        >
          <Text style={{ fontSize: 8, width: '95%', textAlign: 'center' }}>
            *DoSomething.org is the largest not-for-profit exclusively for young
            people and social change. We encourage self-directed activism and
            volunteerism through our structured campaign programs. Estimated
            hours are based on our calculations of the average time it would
            take to complete the action specified in the campaign program.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

CertificateTemplate.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateTemplate;
