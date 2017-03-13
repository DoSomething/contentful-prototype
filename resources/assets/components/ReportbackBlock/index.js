import React from 'react';
import Block from '../Block';
import { FlexCell } from '../Flex';
import { Phoenix } from '@dosomething/gateway';
import Reaction from '../Reaction';

const ReportbackItem = (props) => {
  return (
    <Block className="reportback-block">
      <img src={props.data.image} />
      <div className="padded">
        <h4>{props.data.firstName}</h4>
        <p className="footnote">{`${props.data.quantity} jeans`}</p>
        { props.reaction }
      </div>
    </Block>
  );
};

const ReportbackBlock = (props) => {
  const items = props.reportbacks.map(reportback => {
    const item = reportback.reportback_items.data[0];
    const data = {
      image: item.media.uri,
      firstName: reportback.user.first_name,
      quantity: reportback.quantity,
    };

    const reactionData = props.reactions.data[item.id];

    const toggleOn = () => {
      if (props.user.id === null) {
        window.location.href = '/login';
        return;
      }

      props.userToggledReactionOn(item.id, reactionData.termId);
    };

    const toggleOff = () => {
      props.userToggledReactionOff(item.id, reactionData.id);
    };

    const reaction = (
      <Reaction
        active={reactionData.reacted}
        total={reactionData.total}
        onToggleOn={toggleOn}
        onToggleOff={toggleOff} />
    );

    return (
      <FlexCell key={reportback.id}>
        <ReportbackItem data={data} reaction={reaction} />
      </FlexCell>
    );
  });

  return <FlexCell>{items}</FlexCell>;
};

export default ReportbackBlock;
