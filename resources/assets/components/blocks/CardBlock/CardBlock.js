import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import Byline from '../../utilities/Byline/Byline';
import { contentfulImageUrl } from '../../../helpers';
import Markdown from '../../utilities/Markdown/Markdown';

const CardBlock = props => {
  const { id, author, title, content, link } = props;

  const authorFields = get(author, 'fields', {});
  const authorPhoto = authorFields.photo || undefined;

  return (
    <Card id={id} title={title} className={classnames('rounded', 'bordered')}>
      <Markdown className="padded">{content}</Markdown>

      {link ? (
        <div className="padded">
          <Embed url={link} />
        </div>
      ) : null}

      {author ? (
        <footer className="padded clearfix">
          <Byline
            className="float-left"
            author={authorFields.name}
            jobTitle={authorFields.jobTitle || undefined}
            photo={
              authorPhoto
                ? contentfulImageUrl(authorPhoto, 175, 175, 'fill')
                : undefined
            }
          />
        </footer>
      ) : null}
    </Card>
  );
};

CardBlock.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string,
  author: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
};

CardBlock.defaultProps = {
  content: null,
  link: null,
  author: null,
};

export default CardBlock;
