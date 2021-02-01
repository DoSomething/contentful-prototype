/* global FileReader, URL, Blob */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { processFile } from '../../../helpers/file';

import './media-uploader.scss';

class MediaUploader extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();

    this.readFile(event.target.files[0]);
  }

  readFile(file) {
    const fileReader = new FileReader();
    let blob;

    fileReader.readAsArrayBuffer(file);

    fileReader.onloadend = () => {
      try {
        blob = processFile(fileReader.result);

        this.props.onChange({
          file: blob,
          filePreviewUrl: URL.createObjectURL(blob),
        });
      } catch (error) {
        // @todo: need a nice way to handle this, display message?
        console.log(error);
      }
    };
  }

  render() {
    const { hasError } = this.props;
    const { filePreviewUrl } = this.props.media;
    let content = null;

    if (filePreviewUrl) {
      content = (
        <div className="media-uploader__content media-uploader--file">
          <img src={filePreviewUrl} alt="uploaded file" />
        </div>
      );
    } else {
      content = (
        <div className="media-uploader__content media-uploader--action underline">
          <span>{this.props.label}</span>
        </div>
      );
    }

    return (
      <div
        className={classnames('media-uploader', {
          'has-image': filePreviewUrl,
          'has-error shake': hasError,
        })}
      >
        <label htmlFor="media-uploader">
          {content}
          <input
            type="file"
            id="media-uploader"
            name="media-uploader"
            onChange={this.handleChange}
            required
          />
        </label>
      </div>
    );
  }
}

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
