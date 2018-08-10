import React from 'react';
import {connect} from 'react-redux';

import style from './ContactOverlay.scss';
import {registerSubMenuOpened} from '../../Actions/SubMenuOpened';

const ContactOverlay = props => {
  const {
    contact_overlay
  } = style;
  return (
    <div
      onClick={() => {
        props.closeContact();
        props.dispatch(registerSubMenuOpened(props.SectionBeforeContact));
      }}
      className={contact_overlay}
      style={{
        opacity: props.distanceUp > 400 ? 0.8 : props.distanceUp/500,
        transition: props.transitionState,
        display: props.displayVariable
      }}
    />
  );
};

const mapStateToProps = store => ({
  SectionBeforeContact: store.SectionBeforeContact
});

export default connect(mapStateToProps)(ContactOverlay);