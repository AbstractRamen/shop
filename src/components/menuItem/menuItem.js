import React from 'react';
import { withRouter } from 'react-router-dom';

import './menuItem.styles.scss';

const MenuItem = ({title, imageUrl, size, linkUrl, history}) => (
  <div className={`${size} menu-item`}
    onClick={()=> history.push(`${linkUrl}`)}>
    <div
      className='background-image'
      style={{backgroundImage: `url(${imageUrl})`}}
    />
    <div className="content">
      <h1 className="title">
        {title.toUpperCase()}
      </h1>
      <span className="subtitle">
        Shop now
      </span>
    </div>
  </div>
);

export default withRouter(MenuItem);
