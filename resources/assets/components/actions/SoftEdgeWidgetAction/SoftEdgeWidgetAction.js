import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';

class SoftEdgeWidgetAction extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.initSoftEdgeScript();
  }

  /**
   * Append the SoftEdge to the DOM and add event listener for when it loads.
   */
  initSoftEdgeScript = () => {
    // Create an item in memory.
    const script = document.createElement('script');

    // Make the source attribute equal to this URL.
    script.src = '//www.congressweb.com/cweb/js/jquery.congressweb.iframe.js';

    // Attach the new script tag to the head of the document.
    document.head.append(script);

    // @TODO: in the below this.loadSoftEdgeWidget, that is where you'll run the $cweb function.
    // Maybe something like window.vit.load.$cweb...
    script.addEventListener('load', this.loadSoftEdgeWidget);
  };

  render() {
    return (
      <Card className="bordered rounded" title={this.props.title}>
        <div id={`congressweb-action-${this.props.softEdgeId}`} />
      </Card>
    );
  }
}

export default SoftEdgeWidgetAction;

// <!-- Plugin BEGIN -->
// <script language="javascript" src="//www.congressweb.com/cweb/js/jquery.congressweb.iframe.js"></script>
// The below might be the function instead of this.loadVit...play around with this.
// <script language="javascript">$cweb(function(){ $cweb('#congressweb-action-1').congressweb({ url : '//www.congressweb.com/dosomething/1', responsive  : true }); });</script>
// <div id="congressweb-action-1"></div>
// <!-- Plugin END -->
