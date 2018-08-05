import {
  addViewToPreviouslyOpenedViews,
  pauseProgressBarByRevisiting,
  resetProgressBar,
  unpauseProgressBarByTouchEvent
} from '../Actions/ProgressBar';
import {showNextGuide} from '../Actions/Guide';
import {registerSectionBeforeContact} from '../Actions/SectionBeforeContact';
import {registerCurrentSectionIndex} from '../Actions/CurrentSectionIndex';
import {registerViewBeforeContact} from '../Actions/ViewBeforeContact';
import {registerSubMenuOpened} from '../Actions/SubMenuOpened';
import {registerCurrentViewIndex} from '../Actions/CurrentViewIndex';

const MainMenuItemClick = (
  mainHeaderIndex,
  Section,
  props
) => {
  props.dispatch(registerSubMenuOpened(mainHeaderIndex));
  if(!props.previouslyOpenedViews.indexOf(props.ViewBeforeContact) >= 0) {
    props.dispatch(addViewToPreviouslyOpenedViews(
      props.ViewBeforeContact
    ));
  }
  if(Section !== 'Contact') {
    if(
      props.previouslyOpenedViews.indexOf(
        props.eachSectionFirstPageIndex[mainHeaderIndex]
      ) >= 0 &&
      mainHeaderIndex !== props.SectionBeforeContact
    ) {
      props.dispatch(pauseProgressBarByRevisiting());
    }
    if(
      Section !== 'Experience' &&
      Section !== 'Portfolio' &&
      Section !== 'Education'
    ) {
      if(mainHeaderIndex !== props.SectionBeforeContact) {
        props.dispatch(resetProgressBar());
        if(props.currentGuideIndex <= 4) {
          props.dispatch(showNextGuide());
        }
      }
      props.closeMainMenu();
      props.handleStateAfterClosingContact();
      props.dispatch(unpauseProgressBarByTouchEvent());
      props.dispatch(registerSectionBeforeContact(mainHeaderIndex));
      props.dispatch(registerCurrentViewIndex(
        props.eachSectionFirstPageIndex[mainHeaderIndex]
      ));
      props.dispatch(registerViewBeforeContact(
        props.eachSectionFirstPageIndex[mainHeaderIndex]
      ));
      props.dispatch(registerCurrentSectionIndex(mainHeaderIndex));
    }
  }
  else if(Section === 'Contact') {
    props.closeMainMenu();
    props.openContact();
  }
};

export default MainMenuItemClick;