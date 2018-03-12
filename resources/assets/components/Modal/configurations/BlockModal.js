import React from 'react';
import PropTypes from 'prop-types';

import ContentfulEntry from '../../ContentfulEntry';
import ModalControls from '../ModalControls';
import StaticBlock from '../../StaticBlock';
import { parseContentfulType } from '../../../helpers';

const BlockModal = (props) => {
  const { json, closeModal } = props;

  let children = <ContentfulEntry json={json} />;

  if (parseContentfulType(json) === 'page') {
    children = (
      <StaticBlock
        content={json.fields.content}
        source={json.fields.source}
        title={json.fields.title}
      />
    );
  }

  return (
    <ModalControls className="modal__slide" onClose={closeModal}>
      { children }
    </ModalControls>
  );
};

BlockModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  json: PropTypes.object, // eslint-disable-line
};

BlockModal.defaultProps = {
  json: null,
};

export default BlockModal;
