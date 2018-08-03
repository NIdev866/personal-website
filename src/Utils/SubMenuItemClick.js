import {
  addViewToPreviouslyOpenedViews,
  pauseProgressBarByRevisiting,
  resetProgressBar,
  unpauseProgressBarByTouchEvent
} from "../Actions/ProgressBar";
import {registerSectionBeforeContact} from "../Actions/SectionBeforeContact";
import {showNextGuide} from "../Actions/Guide";
import {registerCurrentSectionIndex} from "../Actions/CurrentSectionIndex";
import {registerCurrentViewIndex} from "../Actions/CurrentViewIndex";
import {registerViewBeforeContact} from "../Actions/ViewBeforeContact";
import {registerSubMenuOpened} from "../Actions/SubMenuOpened";

const SubMenuItemClick = (
  mainHeaderIndex,
  subMenuItemIndex,
  props
) => {
  props.dispatch(registerSectionBeforeContact(mainHeaderIndex));
  props.dispatch(registerSubMenuOpened(mainHeaderIndex));
  if(props.ViewBeforeContact !==
    props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
  ) {
    props.dispatch(resetProgressBar());
    if(props.currentGuideIndex <= 4) {
      props.dispatch(showNextGuide());
    }
  }
  props.dispatch(registerViewBeforeContact(
    props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
  ));
  if(
    props.previouslyOpenedViews.indexOf(
      props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
    ) >= 0 &&
    props.ViewBeforeContact !== props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
  ) {
    props.dispatch(pauseProgressBarByRevisiting());
  }
  if(!props.previouslyOpenedViews.indexOf(
    props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
  ) >= 0) {
    props.dispatch(addViewToPreviouslyOpenedViews(
      props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
    ));
  }
  props.closeMainMenu();
  props.handleStateAfterClosingContact();
  props.dispatch(unpauseProgressBarByTouchEvent());
  props.dispatch(registerCurrentViewIndex(
    props.eachSectionFirstPageIndex[props.SubMenuOpened] + subMenuItemIndex
  ));
  props.dispatch(registerCurrentSectionIndex(mainHeaderIndex))
};

export default SubMenuItemClick;