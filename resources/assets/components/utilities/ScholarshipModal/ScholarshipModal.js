import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import Card from '../Card/Card';
import TextContent from '../TextContent/TextContent';

const ScholarshipModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Card>
      <TextContent>Hello!</TextContent>
    </Card>
  </Modal>
);

ScholarshipModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
};
export default ScholarshipModal;
