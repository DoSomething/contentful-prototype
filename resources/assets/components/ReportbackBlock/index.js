import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import './reportback.scss';

class ReportbackReaction extends React.Component {
  constructor(props) {
    super(props);

    this.onReact = this.onReact.bind(this);

    this.state = {
      reacted: false,
      total: this.props.term ? this.props.term.total : 0,
    }
  }

  //TODO: Fetch state of Reaction for this user on load

  onReact() {
    this.setState({
      reacted: !this.state.reacted,
      total: this.state.total + (this.state.reacted ? -1 : 1),
    });
    //TODO: Make API call to change the Reaction state (POST|DELETE)
  }

  render() {
    return (
      <div className="reaction" onClick={this.onReact}>
        <div className={classNames('reaction__button', {'-reacted' : this.state.reacted})}></div>
        <div className="reaction__meta">
          <p>{this.state.total}</p>
        </div>
      </div>
    );
  }
}

const ReportbackItem = (props) => {
  const item = props.reportback.reportback_items.data[0];
  const image = item.media.uri;
  const name = props.reportback.user.first_name;
  const impact = `${props.reportback.quantity} jeans`;
  const reactions = item.kudos.data[0];

  return (
    <Block className="reportback-block">
      <img src={image} />
      <div className="padded">
        <h4>{name}</h4>
        <p className="footnote">{impact}</p>
        <ReportbackReaction reactions={reactions} />
      </div>
    </Block>
  );
};

const ReportbackBlock = (props) => {
  const items = props.reportbacks.map(reportback => (
    <FlexCell key={reportback.id}>
      <ReportbackItem reportback={reportback}/>
    </FlexCell>
  ));

  return <FlexCell>{items}</FlexCell>;
};

export default ReportbackBlock;
