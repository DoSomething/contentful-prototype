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
    { src: '/fonts/sourcesanspro-regular.woff' },
    {
      src: '/fonts/sourcesanspro-bold.woff',
      fontWeight: 700,
    },
    {
      src: '/fonts/sourcesanspro-italic.woff',
      fontStyle: 'italic',
    },
  ],
});

Font.register({
  family: 'League Gothic',
  src: '/fonts/leaguegothic-regular.woff',
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
      style={{ fontSize: 14, fontFamily: 'Source Sans Pro' }}
      size="letter"
    >
      <View
        style={{
          border: `13 solid ${colors.lightBlue}`,
          height: '100%',
          paddingHorizontal: 100,
        }}
      >
        <View
          style={[styles.flex, { justifyContent: 'center', marginTop: 30 }]}
        >
          <View>
            <Image
              src="/images/dosomething-logo.jpg"
              style={{ height: 50, width: 60 }}
            />
          </View>

          <View style={{ alignSelf: 'center' }}>
            <Text style={{ paddingLeft: 20, fontWeight: 'bold', fontSize: 20 }}>
              &#43;
            </Text>
          </View>
          <View>
            {/* @TODO add the campaign sponsor here as an Image */}
            <Text
              style={{
                marginLeft: 20,
                border: '1 solid black',
                height: 50,
                width: 50,
                fontSize: 10,
                textAlign: 'center',
              }}
            >
              Sponsor logo
            </Text>
          </View>
        </View>

        <Image
          style={{ marginTop: 15 }}
          src="/images/volunteer-credit-certificate-title.jpg"
        />

        <View style={{ textAlign: 'center', marginTop: -25 }}>
          <Text>DoSomething.org certifies that</Text>
          <Text
            style={{
              fontSize: 34,
              fontFamily: 'League Gothic',
              color: colors.purple,
            }}
          >
            Mendel
          </Text>
          <Text>has completed the following volunteering campaign:</Text>
        </View>

        <View
          style={[
            styles.flex,
            {
              border: `2 solid ${colors.lightBlue}`,
              marginTop: 20,
              height: 150,
              lineHeight: 1.1,
            },
          ]}
        >
          <View
            style={{
              width: '25%',
              borderRight: `2 solid ${colors.lightBlue}`,
            }}
          >
            <Image src="https://activity-dev.dosomething.org/images/6YpKv0kz8n" />
          </View>

          <View style={{ width: '75%', padding: '10 0 5 30' }}>
            <Text
              style={{
                fontSize: 24,
                textTransform: 'uppercase',
                fontFamily: 'League Gothic',
                color: colors.darkBlue,
              }}
            >
              Love Letters Challenge
            </Text>

            <Text style={{ fontStyle: 'italic' }}>
              Make a valentine&apos;s day card to show an adult you care.
            </Text>

            <View style={{ fontSize: 12 }}>
              <View style={[styles.flex, { marginTop: 10 }]}>
                <View style={{ width: '40%' }}>
                  <Text style={styles.postDetailsTitle}>Date Completed</Text>
                  <Text>January 21, 2020</Text>
                </View>

                <View>
                  <Text style={styles.postDetailsTitle}>Volunteer Hours*</Text>
                  <Text>3 hours</Text>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.postDetailsTitle}>Impact</Text>
                <Text>20 cards created</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ fontSize: 9, marginTop: 25, lineHeight: 1.1 }}>
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
          <Text style={{ fontSize: 7, width: '90%', textAlign: 'center' }}>
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
