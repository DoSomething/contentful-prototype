import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import Card from '../Card/Card';

const ScholarshipModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <Card>
      <div>
        <h1 className="p-8">This is a test scholarship modal</h1>
      </div>
    </Card>
  </Modal>
);

ScholarshipModal.propTypes = {
  onClose: PropTypes.bool.isRequired,
};
export default ScholarshipModal;
