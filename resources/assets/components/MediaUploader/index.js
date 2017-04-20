/* global FileReader, URL, Blob */

import React from 'react';
import classnames from 'classnames';
import { processFile } from '../../helpers';
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
    const { filePreviewUrl } = this.props.media;
    let content = null;

    if (filePreviewUrl) {
      content = (<img src={filePreviewUrl} alt="uploaded file" />);
    } else {
      content = (<span>{this.props.label}</span>);
    }

    return (
      <div className={classnames('media-uploader', { 'has-image': filePreviewUrl })}>
        <label htmlFor="media-uploader">
          {content}
          <input type="file" id="media-uploader" name="media-uploader" onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}

MediaUploader.propTypes = {
  label: React.PropTypes.string,
  media: React.PropTypes.shape({
    file: React.PropTypes.instanceOf(Blob),
    filePreviewUrl: React.PropTypes.string,
  }),
  onChange: React.PropTypes.func.isRequired,
};

MediaUploader.defaultProps = {
  label: 'Upload Media',
  media: {
    file: null,
    filePreviewUrl: null,
  },
};

export default MediaUploader;
