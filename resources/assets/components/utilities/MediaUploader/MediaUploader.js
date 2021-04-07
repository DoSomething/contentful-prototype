/* global FileReader, URL, Blob */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from '@emotion/core';

import { processFile } from '../../../helpers/file';
import plusSign from '../../../images/plus_sign.svg';

import './media-uploader.scss';

const MediaUploader = ({ label, onChange, hasError, media }) => {
  const readFile = file => {
    const fileReader = new FileReader();
    let blob;

    fileReader.readAsArrayBuffer(file);

    fileReader.onloadend = () => {
      try {
        blob = processFile(fileReader.result);

        onChange({
          file: blob,
          filePreviewUrl: URL.createObjectURL(blob),
        });
      } catch (error) {
        // @todo: need a nice way to handle this, display message?
        console.log(error);
      }
    };
  };

  const handleChange = event => {
    event.preventDefault();

    readFile(event.target.files[0]);
  };

  const { filePreviewUrl } = media;

  return (
    <div
      className={classnames(
        'media-uploader bg-gray-200 text-gray-600 mb-3 w-full hover:bg-gray-300',
        {
          'has-image': filePreviewUrl,
          'has-error shake': hasError,
        },
      )}
      css={css`
        &:hover,
        &:focus {
          background-color: darken(#eee, 5%);
        }
      `}
    >
      <label
        htmlFor="media-uploader"
        className="cursor-pointer block h-0 overflow-hidden relative w-full"
        css={css`
          padding-bottom: 100%;
          &::before {
            ${filePreviewUrl ? 'display: none;' : ''}
          }
        `}
      >
        <div
          className={classnames(
            'media-uploader__content items-center flex h-full justify-center left-0 absolute top-0 w-full',
            {
              'media-uploader--file bg-gray-100': filePreviewUrl,
              'flex-col': !filePreviewUrl,
            },
          )}
        >
          {filePreviewUrl ? (
            <img
              src={filePreviewUrl}
              alt="uploaded file"
              className="max-h-full"
            />
          ) : (
            <>
              <img src={plusSign} alt="plus symbol" className="mb-2" />

              <span
                className="underline font-semibold leading-normal text-center"
                css={css`
                  max-width: 170px;
                `}
              >
                {label}
              </span>
              <p className="text-gray-600 pt-2 italic">{'must be <10MB'}</p>
            </>
          )}
        </div>

        <input
          type="file"
          id="media-uploader"
          name="media-uploader"
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

MediaUploader.propTypes = {
  hasError: PropTypes.bool,
  label: PropTypes.string,
  media: PropTypes.shape({
    file: PropTypes.instanceOf(Blob),
    filePreviewUrl: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

MediaUploader.defaultProps = {
  hasError: false,
  label: 'Upload Media',
  media: {
    file: null,
    filePreviewUrl: null,
  },
};

export default MediaUploader;
