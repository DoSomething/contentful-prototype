import kebabCase from 'lodash/kebabCase';
import { pdf } from '@react-pdf/renderer';
import React, { useState, useEffect } from 'react';

import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';
import PrimaryButton from '../../../utilities/Button/PrimaryButton';
import CertificateTemplate, {
  certificatePostType,
} from './CertificateTemplate';

const CertificateDownloadButton = ({ certificatePost }) => {
  const [loading, setLoading] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const [buttonText, setButtonText] = useState(
    certificatePost.pending ? 'pending' : 'download',
  );
  const [generatePdfError, setGeneratePdfError] = useState(null);

  // Dynamically toggles the button text to 'loading' while we're in loading state.
  useEffect(() => {
    if (certificatePost.pending) {
      return;
    }

    setButtonText(loading ? 'loading' : 'download');
  }, [loading]);

  /**
   * Handle PDF rendering errors.
   *
   * @param {Error} error
   */
  const handleError = error => {
    setLoading(false);

    setGeneratePdfError(error);
    // @TODO: Track analytics. Report error to NR.
    console.error(error);
  };

  /**
   * Generate the certificate PDF data, and build a phantom download link.
   *
   * @return {Promise}
   */
  const generatePdfLink = () =>
    new Promise((resolve, reject) => {
      // Playing it safe to catch any errors caused by the initial PDF rendering step.
      try {
        // Render the PDF template.
        pdf(<CertificateTemplate certificatePost={certificatePost} />)
          .toBlob()
          .then(blob => {
            // Create a 'phantom' link so we can download the PDF on the user's behalf.
            const phantomLink = document.createElement('a');

            phantomLink.href = URL.createObjectURL(blob);

            // Assign the PDF filename.
            phantomLink.download = `dosomething-volunteer-certificate-${kebabCase(
              certificatePost.campaignWebsite.showcaseTitle,
            )}.pdf`;

            resolve(phantomLink);
          })
          // Catch any errors from the PDF data -> blob conversion.
          .catch(reject);
        // Catch any errors from the initial PDF render.
      } catch (error) {
        reject(error);
      }
    });

  /**
   * Handle click events on the download button.
   *
   */
  const handleClick = () => {
    // If we've already generated a pdfLink, simply 'click' it to download the PDF.
    if (pdfLink) {
      pdfLink.click();
      return;
    }

    setLoading(true);

    // Generate the phantom PDF link, and 'click' it to download the PDF!
    generatePdfLink()
      .then(link => {
        // Save this download link in state so we can just 'click' it again if necessary.
        setPdfLink(link);

        link.click();

        setLoading(false);
      })
      .catch(handleError);
  };

  if (generatePdfError) {
    return <ErrorBlock error={generatePdfError} />;
  }

  return (
    <PrimaryButton
      type="button"
      className="w-full py-4 text-lg capitalize"
      isDisabled={certificatePost.pending || loading}
      isLoading={loading}
      // If a sneaky user removes the 'disabled' attribute we don't want to trigger the PDF download.
      onClick={() => !certificatePost.pending && handleClick()}
      text={buttonText}
    />
  );
};

CertificateDownloadButton.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateDownloadButton;
