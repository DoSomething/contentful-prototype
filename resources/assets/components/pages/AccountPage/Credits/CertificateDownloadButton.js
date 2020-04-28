import classNames from 'classnames';
import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';

import ErrorBlock from '../../../blocks/ErrorBlock/ErrorBlock';
import CertificateTemplate, {
  certificatePostType,
} from './CertificateTemplate';

const CertificateDownloadButton = ({ certificatePost }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);

  /**
   * Handle PDF rendering errors.
   *
   * @param {Error} err
   */
  const handleError = err => {
    // We're no longer loading.
    setLoading(false);
    // Update the local error state.
    setError(err);
    // @TODO: Track analytics. Report error to NR.
    console.error(err);
  };

  /**
   * Generate the certificate PDF data, and build a phantom download link.
   *
   * @return {Promise|Undefined}
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
            // @TODO: Update filename per https://www.pivotaltracker.com/story/show/172439408/comments/213717690.
            phantomLink.download = 'certificate.pdf';


            // All set! We pass along the link so that on the initial process we can click the
            // link directly without referring to the local link in state which saves asynchronously.
            resolve(phantomLink);
          })
          // Catch any errors from the PDF data -> blob conversion.
          .catch(reject);
        // Catch any errors from the initial PDF render.
      } catch (err) {
        reject(err);
      }
    });

  /**
   * Handle click events on the download button.
   *
   */
  const handleClick = () => {
    // If we've already generated a pdfLink, we can simply 'click' it to download the pdf.
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

  /**
   * Generate button text per PDF status.
   *
   */
  const buttonText = () => {
    if (certificatePost.pending) {
      return 'Pending';
    }

    if (loading) {
      return 'Loading';
    }

    return 'Download';
  };

  if (error) {
    return <ErrorBlock error={error} />;
  }

  return (
    <button
      type="button"
      className={classNames('btn w-full py-4 text-lg', {
        'bg-blue-500 hover:bg-blue-300': !certificatePost.pending,
        'is-loading': loading,
      })}
      disabled={certificatePost.pending || loading}
      // If a sneaky user removes the 'disabled' attribute we don't want to trigger the PDF download.
      onClick={() => !certificatePost.pending && handleClick()}
    >
      {buttonText()}
    </button>
  );
};

CertificateDownloadButton.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateDownloadButton;
