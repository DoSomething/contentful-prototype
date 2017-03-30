import React from 'react';
import { FlexCell } from '../Flex';
import ShareContainer from '../../containers/ShareContainer';
import './affirmation.scss';

class Affirmation extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      open: true,
    }
  }

  onClick() {
    this.setState({ open: false });
  }

  render() {
    if (!this.state.open) return null;

    return (
      <FlexCell width="full">
        <div className="affirmation">
          <h1>{ this.props.title }</h1>
          <p>{ this.props.description }</p>
          <ShareContainer variant="blue" />
          <a className="affirmation__exit" href="#" onClick={this.onClick}>&times;</a>
        </div>
      </FlexCell>
    );
  }
}

Affirmation.defaultProps = {
  title: 'THANKS SO MUCH!',
  description: 'Share this campaign with everyone you know because you are just that awesome',
};

export default Affirmation;
