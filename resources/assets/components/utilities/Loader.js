import Loadable from 'react-loadable';

import Placeholder from './Placeholder';

/**
 * HoC for lazy-loading React components.
 *
 * @param {Promise} module
 * @return {React.Component}
 */
function Loader(module) {
  const component = Loadable({
    loader: () => module,
    loading: Placeholder,
  });

  return component;
}

export default Loader;
