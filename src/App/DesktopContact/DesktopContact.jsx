import React from 'react';
import {connect} from 'react-redux';

import style from './DesktopContact.scss';
import Exit from '../../Assets/Static/Exit.png';
import ResponsiveContactViewHeight from '../../Utils/ResponsiveContactViewHeight';
import {registerSubMenuOpened} from '../../Actions/SubMenuOpened';
import ContactContainer from '../Content/Contact/ContactContainer';

const DesktopContact = props => {
  const {
    desktop_contact,
    exit_button
  } = style;
  return (
    <div
      style={{bottom: ResponsiveContactViewHeight(
        props.ScreenWidth, props.distanceUp, 'desktop'
      )}}
      className={desktop_contact}
    >
      <img
        alt='Exit button'
        className={exit_button}
        src={props.exitImage}
        onClick={() => {
          props.closeContact();
          props.dispatch(registerSubMenuOpened(props.SectionBeforeContact));
        }}
      />
      <ContactContainer />
    </div>
  );
};

DesktopContact.defaultProps = {
  exitImage: Exit
};

const mapStateToProps = store => ({
  ScreenWidth: store.ScreenWidth,
  SectionBeforeContact: store.SectionBeforeContact
});

export default connect(mapStateToProps)(DesktopContact);