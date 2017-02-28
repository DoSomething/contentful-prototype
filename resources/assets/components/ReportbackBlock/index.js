import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import { Phoenix } from '@dosomething/gateway';
import Reaction from '../Reaction';

class ReportbackReaction extends React.Component {
  constructor(props) {
    super(props);

    this.onReact = this.onReact.bind(this);
    this.phoenix = new Phoenix();

    const currentUser = this.props.reactions.current_user;

    this.state = {
      active: currentUser ? currentUser.reacted : false,
      total: this.props.reactions.term.total,
      reactionId: currentUser ? currentUser.kudos_id : '',
    }
  }

  onReact() {
    const newReactionState = !this.state.active;

    this.setState({
      active: newReactionState,
      total: this.state.total + (newReactionState ? 1 : -1),
    });

    this.phoenix.post('api/v1/reactions', {
      'reportback_item_id': this.props.itemId,
      'term_id': this.props.reactions.term.id,
      'value': newReactionState,
      'reaction_id': this.state.reactionId,
    })
    .then((res) => {
      console.log(res);
      if (res && res[0] && res[0].created) {
        this.setState({
          reactionId: res[0].kid,
        });
      }
    });
  }

  render() {
    return (
      <Reaction active={this.state.active} total={this.state.total} onClick={this.onReact}></Reaction>
    );
  }
}

ReportbackReaction.defaultProps = {
  reactions: {
    term: {
      id: '',
      total: 0,
    },
    currentUser: {
      reacted: false,
      kudos_id: '',
    },
  },
  itemId: '',
};

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
