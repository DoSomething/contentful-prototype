import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import { Phoenix } from '@dosomething/gateway';
import Reaction from '../Reaction';

class ReportbackReaction extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.phoenix = new Phoenix();

    // This user might be the current user or the Drupal API User
    const currentUser = this.props.reactions.current_user;
    const userReaction = currentUser ? currentUser.reacted : false;

    const reacted = window.USER.authenticated ? userReaction : false;

    this.state = {
      active: reacted,
      total: this.props.reactions.term.total,
      reactionId: currentUser ? currentUser.kudos_id : '',
    }
  }

  onClick() {
    if (!window.AUTH.authenticated) {
      window.location.href = '/login';
      return;
    }

    const newReactionState = !this.state.active;

    this.setState({
      active: newReactionState,
      total: this.state.total + (newReactionState ? 1 : -1),
    });

    if (newReactionState) {
      this.phoenix.post('reactions', {
        'reportback_item_id': this.props.itemId,
        'term_id': this.props.reactions.term.id,
      })
      .then((response) => {
        if (response && response[0] && response[0].created) {
          this.setState({
            reactionId: response[0].kid,
          });
        }
      });
    } else {
      this.phoenix.delete(`reactions/${this.state.reactionId}`);
    }
  }

  render() {
    return (
      <Reaction active={this.state.active} total={this.state.total} onClick={this.onClick}></Reaction>
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
