/* global FormData */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../utilities/Card/Card';

class PhotoSubmissionAction extends React.Component {
  state = {
    showModal: false,
  };

  render() {
    return (
      <React.Fragment>
        <Card
          id={this.props.id}
          className={classnames(
            'bordered rounded photo-submission-action',
            this.props.className,
          )}
          title={this.props.title}
        >
          <form>
            <div className="padded">
              <div className="form-item">
                <label className={classnames('field-label')} htmlFor="caption">
                  {this.props.captionFieldLabel}
                </label>
              </div>
            </div>
          </form>
        </Card>
      </React.Fragment>
    );
  }
}

PhotoSubmissionAction.propTypes = {
  captionFieldLabel: PropTypes.string,
  captionFieldPlaceholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};

PhotoSubmissionAction.defaultProps = {
  captionFieldLabel: 'Add a caption to your photo.',
  captionFieldPlaceholder: '60 characters or less',
  title: 'Submit your photo',
};

export default PhotoSubmissionAction;
