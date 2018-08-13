import React from 'react';
import {connect} from 'react-redux';

import style from './Content.scss';
import Header from './Header/Header';
import View from './View/View';
import Footer from './Footer/Footer';

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
      <View
        contactViewPosition={props.contactViewPosition}
        onClickState={props.onClickState}
        event={props.event}
        sideSwipeDistance={props.sideSwipeDistance}
        transitionState={props.transitionState}
      />
      <Footer
        openMainMenuByPressingButton={props.openMainMenuByPressingButton}
      />
    </div>
  );
};

const mapStateToProps = store => ({
  ScreenHeight: store.ScreenHeight
});

export default connect(mapStateToProps)(Content);