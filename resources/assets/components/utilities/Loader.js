import Loadable from 'react-loadable';

import Placeholder from './Placeholder';

/**
 * HoC for lazy-loading React components.
 *
 * @param {Promise} module
 * @return {React.Component}
 */
const Loader = module =>
  Loadable({
    loader: () => module,
    loading: Placeholder,
  });

export default Loader;
