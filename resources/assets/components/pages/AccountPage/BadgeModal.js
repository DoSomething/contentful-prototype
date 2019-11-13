import React from 'react';
import PropTypes from 'prop-types';

import Badge from './Badge';
import Modal from '../../utilities/Modal/Modal';

const BadgeModal = props => {
  const { name, earned, children, onClose } = props;

  return (
    <Modal className="badge -inverted" onClose={onClose}>
      <div>
        <div className="badge-pattern p-3">
          <Badge
            showLock
            earned={earned}
            className="badge padded"
            size="medium"
            name={name}
          />
        </div>
        <div
          className="inverted p-8 margin-horizontal-auto text-center"
          style={{ maxWidth: '400px' }}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};

BadgeModal.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

BadgeModal.defaultProps = {
  children: null,
};

export default BadgeModal;
