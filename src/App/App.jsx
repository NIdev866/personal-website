import React from 'react';
import {connect} from 'react-redux';

import style from './App.scss';
import AllPagesRegister from '../Utils/AllPagesRegister';
import AssignCorrectUrl from '../Utils/AssignCorrectUrl';
import BackgroundLoadHandler from "../Utils/BackgroundLoadHandler";
import ScalePercentageHandler from "../Utils/ScalePercentageHandler";
import LoadingContainer from './Loading/LoadingContainer';
import MainMenuContainer from './MainMenu/MainMenuContainer';

const App = props => {
  const {
    app_container,
    app
  } = style;
  return (
    <div
      onTouchStart={e => props.onTouchStartHandler(e)}
      onTouchMove={e => props.onTouchMoveHandler(e)}
      onTouchEnd={e => props.onTouchEndHandler(e)}
      className={app_container}
    >
      <LoadingContainer
        hasBackgroundLoade={props.hasBackgroundLoaded}
      />
      <MainMenuContainer
        zoomOutPercentage={props.zoomOutPercentage}
        transitionState={props.transitionState}
        isMainMenuOpen={props.isMainMenuOpen}
        closeMainMenu={props.closeMainMenu}
        mainMenuDisplayPropertyState={props.mainMenuDisplayPropertyState}
        openContact={props.openContact}
        closeContact={props.closeContact}
        handleStateAfterClosingContact={props.handleStateAfterClosingContact}
      />
      <div
        className={app}
        style={{
          transform: ScalePercentageHandler(props.zoomOutPercentage)
        }}
      >
        <AllPagesRegister />
        <AssignCorrectUrl
          isContactViewOpen={props.isContactViewOpen}
        />
        {BackgroundLoadHandler(props.hasBackgroundLoadedHandler)}
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  SectionBeforeContact: store.SectionBeforeContact
});

export default connect(mapStateToProps)(App);