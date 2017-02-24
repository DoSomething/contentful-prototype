import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import './reportback.scss';
import classnames from 'classnames';
import { Phoenix } from '@dosomething/gateway';

class ReportbackReaction extends React.Component {
  constructor(props) {
    super(props);

    this.onReact = this.onReact.bind(this);
    this.phoenix = new Phoenix();

    const term = this.props.reactions.term;
    const currentUser = this.props.reactions.current_user;

    this.state = {
      reacted: currentUser ? currentUser.reacted : false,
      total: term ? term.total : 0,
    }
  }

  onReact() {
    this.setState({
      reacted: !this.state.reacted,
      total: this.state.total + (this.state.reacted ? -1 : 1),
    });

    this.phoenix.post('api/v1/reactions', {
      'reportback_item_id': this.props.itemId,
      'term_id': this.props.reactions.term.id,
      'value': this.state.reacted,
    }).then(console.log);
  }

  render() {
    return (
      <div className="reaction" onClick={this.onReact}>
        <div className={classnames('reaction__button', {'-reacted' : this.state.reacted})}></div>
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
        <ReportbackReaction reactions={reactions} itemId={item.id} />
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
