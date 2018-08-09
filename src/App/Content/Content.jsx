import React from 'react';
import {connect} from 'react-redux';

import Header from './Header/Header';
import style from './Content.scss';

const Content = props => {
  const {
    content
  } = style;
  return (
    <div
      className={content}
      style={{height: props.ScreenHeight}}
    >
      <Header
        onClickStateHandler={props.onClickStateHandler}
        openContact={props.openContact}
      />
    </div>
  );
};

const mapStateToProps = store => ({
  ScreenHeight: store.ScreenHeight
});

export default connect(mapStateToProps)(Content);