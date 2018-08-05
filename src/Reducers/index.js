import {combineReducers} from 'redux';
import ScreenWidth from './ScreenWidth';
import ScreenHeight from './ScreenHeight';
import AllSections from './AllSections';
import AllPages from './AllPages';
import CurrentSectionIndex from './CurrentSectionIndex';
import CurrentViewIndex from './CurrentViewIndex';
import SectionBeforeContact from './SectionBeforeContact';
import ViewBeforeContact from './ViewBeforeContact';
import SubMenuOpened from './SubMenuOpened';
import ProgressBar from './ProgressBar';
import Guide from './Guide';
import EducationImageInterval from './EducationImageInterval';

const Reducers = combineReducers({
  ScreenWidth,
  ScreenHeight,
  AllSections,
  AllPages,
  CurrentSectionIndex,
  CurrentViewIndex,
  SectionBeforeContact,
  ViewBeforeContact,
  SubMenuOpened,
  ProgressBar,
  Guide,
  EducationImageInterval
});

export default Reducers;