import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import App from '../App/App';
import {
  pauseProgressBarByTouchEvent,
  unpauseProgressBarByTouchEvent,
  addViewToPreviouslyOpenedViews,
  pauseProgressBarByRevisiting,
  unpauseProgressBarByRevisiting,
  resetProgressBar,
  continueProgressBar
} from '../Actions/ProgressBar';
import {
  removeGuideFromDisplay,
  zoomOutHasBeenTriggered,
  swipeUpHasBeenTriggered,
  twoFingerSideSwipeHasBeenTriggered,
  showNextGuide,
  displayGuide,
  oneFingerSideSwipeHasBeenTriggered
} from '../Actions/Guide';
import {
  moveOnePageToRight,
  moveOnePageToLeft,
  registerCurrentViewIndex
} from '../Actions/CurrentViewIndex';
import {
  moveOneSectionToRight,
  moveOneSectionToLeft,
  registerCurrentSectionIndex
} from '../Actions/CurrentSectionIndex';
import {registerViewBeforeContact} from '../Actions/ViewBeforeContact';
import {registerSectionBeforeContact} from '../Actions/SectionBeforeContact';
import {registerSubMenuOpened} from '../Actions/SubMenuOpened';

class StateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionState: 'all 0.3s',
      hasProgressBarStartedAfterBackgroundHasLoaded: false,
      maximumAmountOfTouches: 0,
      currentAmountOfTouches: 0,
      isMainMenuOpen: false,
      mainMenuDisplayPropertyState: 'none',
      isContactViewOpen: props.location.pathname.toLowerCase().indexOf('/contact') === 0,
      distanceUp: props.location.pathname.toLowerCase().indexOf('/contact') === 0 ? 400 : 0,
    };
    if(props.location.pathname.toLowerCase().indexOf('/contact') === 0) {
      props.dispatch(pauseProgressBarByTouchEvent());
    }
  }
  onTouchStartHandler = e => {
    const state = this.state;
    const props = this.props;
    if(state.hasBackgroundLoaded) {
      if(props.currentGuideIndex <= 4) {
        props.dispatch(removeGuideFromDisplay());
      }
      this.setState({
        transitionState: null,
        startOfTouch0ClientX: e.touches[0].clientX,
        startOfTouch0ClientY: e.touches[0].clientY,
        startOfTouch1ClientX: e.touches[1] && e.touches[1].clientX,
        startOfTouch1ClientY: e.touches[1] && e.touches[1].clientY,
      });
    }
  };
  onTouchMoveHandler = e => {
    const state = this.state;
    const props = this.props;
    if(state.hasBackgroundLoaded) {
      if(!props.isProgressBarPausedByTouchEvent) {
        props.dispatch(pauseProgressBarByTouchEvent());
      }
      if(
        state.direction === 'up' &&
        state.mainMenuDisplayPropertyState === 'none'
      ) {
        this.upSwipe(e);
      }
      if(state.event === 'zoomOut') {
        this.zoomOut(e);
      }
      if(state.direction !== 'up') {
        this.sideSwipe(e);
      }
      if(!state.direction) {
        this.setDirectionState(e);
      }
    }
  };
  onTouchEndHandler = e => {
    const state = this.state;
    const props = this.props;
    if(state.hasBackgroundLoaded) {
      if(
        state.direction === 'up' &&
        state.mainMenuDisplayPropertyState === 'none'
      ) {
        this.setState({
          transitionState: 'all .3s',
        });
        if(state.isContactViewOpen){
          if(state.distanceUp > 300) {
            props.dispatch(swipeUpHasBeenTriggered());
            this.openContact();
          }
          else {
            this.closeContact();
          }
        }
        else{
          if(state.distanceUp > 100) {
            props.dispatch(swipeUpHasBeenTriggered());
            this.openContact();
          }
          else {
            this.closeContact();
          }
        }
      }
      if(
        !state.isContactViewOpen &&
        state.mainMenuDisplayPropertyState === 'none'
      ) {
        if(state.event === 'oneFingerSideSwipe') {
          if(state.sideSwipeDistance < -50) {
            if(props.CurrentViewIndex < props.allPagesUrls.length-2) {
              this.moveOnePage(
                moveOnePageToRight,
                props.ViewBeforeContact+1
              );
            }
            else if(props.CurrentViewIndex === props.allPagesUrls.length-2) {
              this.openContact();
            }
          }
          else if(state.sideSwipeDistance > 50) {
            if(props.CurrentViewIndex > 0) {
              this.moveOnePage(
                moveOnePageToLeft,
                props.ViewBeforeContact-1
              );
            }
            else if(props.isProgressBarPausedByTouchEvent) {
              props.dispatch(unpauseProgressBarByTouchEvent());
            }
          }
          else {
            if(props.isProgressBarPausedByTouchEvent) {
              props.dispatch(unpauseProgressBarByTouchEvent());
            }
          }
        }
        if(e.touches.length === 1) {
          if(state.event === 'twoFingersSideSwipe') {
            if(
              state.sideSwipeDistance < -50 ||
              state.sideSwipeDistance > 50
            ) {
              this.setState({
                maximumAmountOfTouches: 0,
                currentAmountOfTouches: 0,
                event: ''
              });
            }
            if(state.sideSwipeDistance < -50) {
              if(props.CurrentSectionIndex < 4) {
                this.moveOneSection(
                  moveOneSectionToRight,
                  props.CurrentSectionIndex+1
                );
              }
              else if(props.CurrentSectionIndex === 4) {
                this.openContact();
              }
            }
            else if(state.sideSwipeDistance > 50) {
              if(props.CurrentViewIndex > 0) {
                this.moveOneSection(
                  moveOneSectionToLeft,
                  props.CurrentSectionIndex-1
                );
              }
              else if(props.CurrentViewIndex === 0) {
                props.dispatch(unpauseProgressBarByTouchEvent());
              }
            }
            else {
              if(props.isProgressBarPausedByTouchEvent) {
                props.dispatch(unpauseProgressBarByTouchEvent());
              }
            }
          }
        }
      }
      this.setState({
        transitionState: 'all .3s',
        sideSwipeDistance: 0,
        direction: '',
        event: '',
        zoomOutDistance: null,
        initialZoomOutDistance: null
      });
      if(state.currentAmountOfTouches > 0) {
        this.setState({
          currentAmountOfTouches: state.currentAmountOfTouches - 1
        },() => {
          if(state.currentAmountOfTouches === 1) {
            this.setState({
              maximumAmountOfTouches: 0,
              direction: '',
              event: ''
            });
          }
        });
      }
      if(state.event === 'zoomOut') {
        if(state.currentAmountOfTouches > 1) {
          if(state.zoomOutPercentage > 60) {
            props.dispatch(zoomOutHasBeenTriggered());
            this.setState({
              isMainMenuOpen: true,
              mainMenuDisplayPropertyState: 'block',
              zoomOutPercentage: 100
            });
          }
          else if(
            state.zoomOutPercentage <= 60 &&
            !state.isMainMenuOpen
          ) {
            if(!state.isContactViewOpen) {
              props.dispatch(unpauseProgressBarByTouchEvent());
            }
            this.setState({
              isMainMenuOpen: false,
              zoomOutPercentage: 0
            },() => {
              setTimeout(() => {
                this.setState({
                  mainMenuDisplayPropertyState: 'none'
                });
              }, 300);
            });
          }
        }
      }
    }
  };
  upSwipe = e => {
    const state = this.state;
    const props = this.props;
    if(
      Math.floor(state.startOfTouch0ClientY - e.touches[0].clientY) > 400
    ) {
      props.dispatch(swipeUpHasBeenTriggered());
      this.setState({
        distanceUp: 400
      });
    }
    else if(state.isContactViewOpen) {
      this.setState({
        distanceUp: Math.floor(state.startOfTouch0ClientY - e.touches[0].clientY) + 420
      });
    }
    else {
      this.setState({
        distanceUp: Math.floor(state.startOfTouch0ClientY - e.touches[0].clientY)
      });
    }
  };
  sideSwipe = e => {
    const state = this.state;
    if(state.currentAmountOfTouches < e.touches.length) {
      this.setState({currentAmountOfTouches: e.touches.length});
    }
    if(state.maximumAmountOfTouches === 0) {
      this.setState({
        maximumAmountOfTouches: e.touches.length,
        currentAmountOfTouches: e.touches.length,
        direction: ''
      });
    }
    else if(state.maximumAmountOfTouches === 1) {
      if(!state.isContactViewOpen) {
        this.setState({
          transitionState: null,
          sideSwipeDistance: e.touches[0].clientX - state.startOfTouch0ClientX,
          event: 'oneFingerSideSwipe'
        });
      }
    }
    else if(state.maximumAmountOfTouches === 2) {
      let positiveDistanceX = state.startOfTouch0ClientX - state.startOfTouch1ClientX;
      let positiveDistanceY = state.startOfTouch0ClientY - state.startOfTouch1ClientY;
      if(positiveDistanceX < 0) {
        positiveDistanceX = 0 - positiveDistanceX;
      }
      if(positiveDistanceY < 0) {
        positiveDistanceY = 0 - positiveDistanceY;
      }
      let overallDistance = Math.sqrt(
        Math.pow(positiveDistanceX, 2) + Math.pow(positiveDistanceY, 2)
      );
      if(overallDistance < 200) {
        if(state.mainMenuDisplayPropertyState === 'none') {
          if(!state.isContactViewOpen) {
            this.setState({
              distanceX: positiveDistanceX,
              distanceY: positiveDistanceY,
              overallDistance,
              transitionState: null,
              sideSwipeDistance: e.touches[0].clientX - state.startOfTouch0ClientX,
              event: 'twoFingersSideSwipe'
            });
          }
        }
      }
      else if(overallDistance >= 200) {
        this.setState({
          distanceX: positiveDistanceX,
          distanceY: positiveDistanceY,
          overallDistance,
          transitionState: null,
          event: 'zoomOut'
        });
      }
    }
  };
  zoomOut = e => {
    const state = this.state;
    if(
      state.mainMenuDisplayPropertyState === 'none' &&
      state.zoomOutPercentage > 0
    ) {
      this.setState({mainMenuDisplayPropertyState: 'block'});
    }
    let positiveDistanceX = 0;
    if(e.touches[1]) {
      positiveDistanceX = e.touches[0].clientX - e.touches[1].clientX;
    }
    let positiveDistanceY = 0;
    if(e.touches[1]) {
      positiveDistanceY = e.touches[0].clientY - e.touches[1].clientY;
    }
    if(positiveDistanceX < 0) {
      positiveDistanceX = 0 - positiveDistanceX;
    }
    if(positiveDistanceY < 0) {
      positiveDistanceY = 0 - positiveDistanceY;
    }
    let zoomOutDistance = Math.sqrt(
      Math.pow(positiveDistanceX, 2) + Math.pow(positiveDistanceY, 2)
    );
    this.setState({
      zoomOutDistance
    });
    if(!state.initialZoomOutDistance) {
      this.setState({
        initialZoomOutDistance: zoomOutDistance
      });
    }
    if(
      state.zoomOutPercentage === null ||
      state.zoomOutPercentage === undefined
    ) {
      this.setState({
        zoomOutPercentage: 0
      });
    }
    else if(state.zoomOutPercentage === 0 || state.zoomOutPercentage) {
      if(Math.floor(0 + ((
        state.initialZoomOutDistance - state.zoomOutDistance
      ) / 1.5)) > 100) {
        this.setState({
          zoomOutPercentage: 100
        });
      }
      else if(Math.floor(0 + ((
        state.initialZoomOutDistance - state.zoomOutDistance
      ) / 1.5)) < 0) {
        this.setState({
          zoomOutPercentage: 0
        });
      }
      else {
        this.setState({
          zoomOutPercentage: Math.floor(0 + ((
            state.initialZoomOutDistance - state.zoomOutDistance
          ) / 1.5))
        });
      }
    }
  };
  setDirectionState = e => {
    const state = this.state;
    let distanceTraveledX = state.startOfTouch0ClientX - e.touches[0].clientX;
    let distanceTraveledY = state.startOfTouch0ClientY - e.touches[0].clientY;
    let positiveDistanceTraveledX = distanceTraveledX;
    let positiveDistanceTraveledY = distanceTraveledY;
    if(positiveDistanceTraveledX < 0){
      positiveDistanceTraveledX = 0 - distanceTraveledX;
    }
    if(positiveDistanceTraveledY < 0){
      positiveDistanceTraveledY = 0 - distanceTraveledY;
    }
    if(positiveDistanceTraveledX > positiveDistanceTraveledY) {
      if(e.touches.length === 1) {
        this.setState({direction: 'sides'});
      }
    }
    else if(positiveDistanceTraveledX <= positiveDistanceTraveledY) {
      if(e.touches.length === 1 && state.maximumAmountOfTouches < 2) {
        this.setState({
          direction: 'up',
          event: 'up'
        });
      }
    }
  };
  moveOnePage = (
    whichDirectionToMovePage,
    newPage
  ) => {
    const props = this.props;
    props.dispatch(whichDirectionToMovePage());
    props.dispatch(oneFingerSideSwipeHasBeenTriggered());
    if(!props.previouslyOpenedViews.indexOf(props.ViewBeforeContact) >= 0) {
      props.dispatch(addViewToPreviouslyOpenedViews(
        props.ViewBeforeContact
      ));
    }
    props.dispatch(resetProgressBar());
    props.dispatch(unpauseProgressBarByTouchEvent());
    if(props.previouslyOpenedViews.indexOf(newPage) >= 0) {
      props.dispatch(pauseProgressBarByRevisiting());
      props.dispatch(resetProgressBar());
    }
    else {
      props.dispatch(unpauseProgressBarByRevisiting());
      if(
        !props.isProgressBarPausedManually &&
        !props.isProgressBarPausedByRevisiting &&
        !props.isProgressBarPausedByTouchEvent
      ) {
        props.dispatch(continueProgressBar());
      }
    }
    if(props.currentGuideIndex <= 4) {
      props.dispatch(showNextGuide());
    }
    props.dispatch(registerViewBeforeContact(newPage));
    let newSection = null;
    props.eachSectionFirstPageIndex.map((sectionsFirstpageIndex, actualIndex) => {
      if(sectionsFirstpageIndex <= newPage) {
        newSection = actualIndex;
      }
      return true;
    });
    if(props.CurrentSectionIndex !== newSection) {
      props.dispatch(registerCurrentSectionIndex(newSection));
      props.dispatch(registerSectionBeforeContact(newSection));
      props.dispatch(registerSubMenuOpened(newSection));
    }
  };
  moveOneSection = (
    whichDirectionToMoveSection,
    newSection
  ) => {
    const props = this.props;
    props.dispatch(whichDirectionToMoveSection());
    props.dispatch(twoFingerSideSwipeHasBeenTriggered());
    props.dispatch(registerSubMenuOpened(newSection));
    if(!props.previouslyOpenedViews.indexOf(props.ViewBeforeContact) >= 0) {
      props.dispatch(addViewToPreviouslyOpenedViews(
        props.ViewBeforeContact
      ));
    }
    if(props.previouslyOpenedViews.indexOf(
      props.eachSectionFirstPageIndex[newSection]
    ) >= 0) {
      props.dispatch(pauseProgressBarByRevisiting());
      props.dispatch(resetProgressBar());
    }
    else {
      props.dispatch(resetProgressBar());
      props.dispatch(unpauseProgressBarByRevisiting());
    }
    props.dispatch(unpauseProgressBarByTouchEvent());
    if(props.currentGuideIndex <= 4) {
      props.dispatch(showNextGuide());
    }
    props.dispatch(registerCurrentViewIndex(props.eachSectionFirstPageIndex[newSection]));
    props.dispatch(registerViewBeforeContact(props.eachSectionFirstPageIndex[newSection]));
    props.dispatch(registerSectionBeforeContact(newSection));
  };
  openContact = () => {
    const props = this.props;
    props.history.push('/Contact');
    if(!props.isProgressBarPausedByTouchEvent) {
      props.dispatch(pauseProgressBarByTouchEvent());
    }
    props.dispatch(registerCurrentSectionIndex(5));
    props.dispatch(registerSubMenuOpened(5));
    props.dispatch(registerCurrentViewIndex(props.allPagesUrls.length-1));
    this.setState({
      isContactViewOpen: true,
      distanceUp: 400,
    });
  };
  closeContact = () => {
    const props = this.props;
    props.dispatch(registerSubMenuOpened(props.SectionBeforeContact));
    this.handleStateAfterClosingContact();
  }
  handleStateAfterClosingContact = () => {
    const props = this.props;
    props.dispatch(registerCurrentSectionIndex(props.SectionBeforeContact));
    if(props.SectionBeforeContact === 0) {
      props.dispatch(registerCurrentViewIndex(0));
    }
    else {
      props.dispatch(registerCurrentViewIndex(props.ViewBeforeContact));
    }
    if(props.isProgressBarPausedByTouchEvent) {
      props.dispatch(unpauseProgressBarByTouchEvent());
    }
    this.setState({
      transitionState: 'all .3s',
      distanceUp: 0,
      isContactViewOpen: false,
    });
  };
  hasBackgroundLoadedHandler = () => {
    this.setState({hasBackgroundLoaded: true});
  };
  openMainMenuByPressingButton = () => {
    const props = this.props;
    if(!props.isProgressBarPausedByTouchEvent) {
      props.dispatch(pauseProgressBarByTouchEvent());
    }
    this.setState({
      transitionState: 'all .3s',
      mainMenuDisplayPropertyState: 'block',
      zoomOutPercentage: 0
    },() => {
      setTimeout(() => {
        this.setState({
          transitionState: 'all .3s',
          isMainMenuOpen: true,
          zoomOutPercentage: 100
        });
      }, 10);
    });
  };
  closeMainMenu = () => {
    this.setState({
      isMainMenuOpen: false,
      zoomOutPercentage: 0
    },() => {
      setTimeout(() => {
        this.setState({mainMenuDisplayPropertyState: 'none'});
      }, 300);
    });
  };
  componentDidUpdate() {
    const state = this.state;
    const props = this.props;
    if(
      !state.hasProgressBarStartedAfterBackgroundHasLoaded &&
      state.hasBackgroundLoaded
    ) {
      this.setState({
        hasProgressBarStartedAfterBackgroundHasLoaded: true
      },() => {
        setTimeout(() => {
          props.dispatch(displayGuide());
        }, 500);
        if(
          props.location.pathname.toLowerCase().indexOf('/contact'.toLowerCase()) !== 0
        ) {
          props.dispatch(continueProgressBar());
        }
      });
    }
  }
  render() {
    const state = this.state;
    return <App
      onTouchStartHandler={this.onTouchStartHandler}
      onTouchMoveHandler={this.onTouchMoveHandler}
      onTouchEndHandler={this.onTouchEndHandler}
      event={state.event}
      zoomOutPercentage={state.zoomOutPercentage}
      distanceUp={state.distanceUp}
      isContactViewOpen={state.isContactViewOpen}
      sideSwipeDistance={state.sideSwipeDistance}
      transitionState={state.transitionState}
      hasBackgroundLoadedHandler={this.hasBackgroundLoadedHandler}
      hasBackgroundLoaded={state.hasBackgroundLoaded}
      isMainMenuOpen={state.isMainMenuOpen}
      closeMainMenu={this.closeMainMenu}
      mainMenuDisplayPropertyState={state.mainMenuDisplayPropertyState}
      openMainMenuByPressingButton={this.openMainMenuByPressingButton}
      closeContact={this.closeContact}
      handleStateAfterClosingContact={this.handleStateAfterClosingContact}
      openContact={this.openContact}
      moveOnePage={this.moveOnePage}
      moveOneSection={this.moveOneSection}
    />;
  }
}

const mapStateToProps = store => ({
  SectionBeforeContact: store.SectionBeforeContact,
  ViewBeforeContact: store.ViewBeforeContact,
  allPagesUrls: store.AllPages.allPagesUrls,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  CurrentViewIndex: store.CurrentViewIndex,
  CurrentSectionIndex: store.CurrentSectionIndex,
  currentGuideIndex: store.Guide.currentGuideIndex,
  isProgressBarPausedManually: store.ProgressBar.isProgressBarPausedManually,
  isProgressBarPausedByTouchEvent: store.ProgressBar.isProgressBarPausedByTouchEvent,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews
});

export default withRouter(connect(mapStateToProps)(StateContainer));