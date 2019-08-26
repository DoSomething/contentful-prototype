import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const DelayedElement = ({ children, delay }) => {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowElement(true), delay * 1000);

    return () => clearTimeout(timer);
  }, []);

  return showElement ? children : null;
};

DelayedElement.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  delay: PropTypes.number.isRequired,
};

export default DelayedElement;
