/* global document window MutationObserver */

/**
 * Enhance router to scroll to elements for anchor links.
 * @see <https://git.io/vATNf>
 *
 * @param {History} history
 * @param {Number} timeout - millisecond delay before looking for element
 */
export default (history, timeout = 1000) => {
  let observer;
  let timeoutId;

  // Supported in IE11+ & evergreens, skip if not.
  // <https://caniuse.com/#feat=mutationobserver>
  if (! window.MutationObserver) {
    return history;
  }

  const reset = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);

      timeoutId = null;
    }

    if (observer) {
      observer.disconnect();
    }
  };

  const createScrollToElement = id => () => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView();

      reset();

      return true;
    }

    return false;
  };

  history.listen((location, action) => {
    if (timeoutId) {
      reset();
    }

    if (action !== 'PUSH') {
      return;
    }

    if (typeof location.hash !== 'string') {
      return;
    }

    const elementId = location.hash.slice(1);

    if (! elementId) {
      return;
    }

    const scrollToElement = createScrollToElement(elementId);

    setTimeout(() => {
      if (scrollToElement()) {
        return;
      }

      observer = new MutationObserver(scrollToElement);

      observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      timeoutId = setTimeout(reset, timeout);
    });
  });

  return history;
};
