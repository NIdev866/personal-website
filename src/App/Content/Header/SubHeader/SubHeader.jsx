import React from 'react';
import {connect} from 'react-redux';

import style from './SubHeader.scss';
import {
  addViewToPreviouslyOpenedViews, continueProgressBar, pauseProgressBarByRevisiting, resetProgressBar,
  unpauseProgressBarByRevisiting,
  unpauseProgressBarByTouchEvent
} from "../../../../Actions/ProgressBar";
import {showNextGuide} from "../../../../Actions/Guide";
import {registerCurrentViewIndex} from "../../../../Actions/CurrentViewIndex";
import {registerViewBeforeContact} from "../../../../Actions/ViewBeforeContact";
import ColouringOfSelected from "../../../../Utils/ColouringOfSelected";

const SubHeader = props => {
  const {
    sub_header_wrapper_parent,
    sub_header_wrapper,
    sub_header,
    each_item_wrapper
  } = style;
  let shouldRenderSubHeader = false;
  let currentSectionName = null;
  let amountOfUrlsEachSectionHas = {};
  if(
    props.AllSections &&
    props.SectionBeforeContact &&
    props.allPagesUrls
  ) {
    currentSectionName = props.AllSections[props.SectionBeforeContact];
    props.AllSections.map((eachSection) => {
      amountOfUrlsEachSectionHas[`/${eachSection}`] = 0;
      return true;
    });
    props.allPagesUrls.map((url) => {
      let indexOfSecondSlash = url.indexOf('/', url.indexOf('/') + 1);
      let sectionCroppedOutOfUrl = url.substring(0, indexOfSecondSlash);
      if(sectionCroppedOutOfUrl === '') {
        sectionCroppedOutOfUrl = url;
      }
      amountOfUrlsEachSectionHas[sectionCroppedOutOfUrl]++;
      return true;
    });
    if(amountOfUrlsEachSectionHas[`/${currentSectionName}`] > 1) {
      shouldRenderSubHeader = true;
    }
  }
  const allSectionsWithAllTheirSubHeaderItems = {};
  let allCurrentSectionsSubHeaderItems = [];
  if(
    props.allViewsFlat &&
    props.allPagesUrls &&
    props.SectionBeforeContact &&
    props.AllSections
  ) {
    props.allViewsFlat.map((viewFlat) => {
      if(allSectionsWithAllTheirSubHeaderItems[viewFlat.SECTION_NAME] === undefined) {
        allSectionsWithAllTheirSubHeaderItems[viewFlat.SECTION_NAME] = [];
      }
      allSectionsWithAllTheirSubHeaderItems[viewFlat.SECTION_NAME].push(viewFlat.headerTitle);
      return true;
    });
    let currentSectionActualName = props.AllSections[props.SectionBeforeContact];
    if(allSectionsWithAllTheirSubHeaderItems[currentSectionActualName].length > 1) {
      allCurrentSectionsSubHeaderItems = allSectionsWithAllTheirSubHeaderItems[
        currentSectionActualName
      ];
    }
  }
  if(allCurrentSectionsSubHeaderItems.length > 0) {
    shouldRenderSubHeader = true;
  }
  if(shouldRenderSubHeader) {
    return (
      <div>
        <div className={sub_header_wrapper_parent}>
          <div className={sub_header_wrapper}>
            <div className={sub_header}>
              {allCurrentSectionsSubHeaderItems.map((currentSectionsSubHeaderItem, index) => (
                <span
                  onClick={() => {
                    if(!props.previouslyOpenedViews.indexOf(props.ViewBeforeContact) >= 0) {
                      props.dispatch(addViewToPreviouslyOpenedViews(
                        props.ViewBeforeContact
                      ));
                    }
                    if(props.ViewBeforeContact !==
                      props.eachSectionFirstPageIndex[props.SectionBeforeContact] + index
                    ) {
                      props.dispatch(resetProgressBar());
                      if(props.currentGuideIndex <= 4) {
                        props.dispatch(showNextGuide());
                      }
                    }
                    if(
                      !props.isProgressBarPausedManually &&
                      !props.isProgressBarPausedByRevisiting &&
                      !props.isProgressBarPausedByTouchEvent
                    ) {
                      props.dispatch(continueProgressBar());
                    }
                    if(props.isProgressBarPausedByTouchEvent) {
                      props.dispatch(unpauseProgressBarByTouchEvent());
                    }
                    if(
                      props.previouslyOpenedViews.indexOf(
                        props.eachSectionFirstPageIndex[props.SectionBeforeContact] + index
                      ) >= 0 &&
                      props.ViewBeforeContact !==
                        props.eachSectionFirstPageIndex[props.SectionBeforeContact] + index
                    ) {
                      props.dispatch(pauseProgressBarByRevisiting());
                    }
                    else {
                      if(props.isProgressBarPausedByRevisiting) {
                        props.dispatch(unpauseProgressBarByRevisiting());
                      }
                    }
                    props.dispatch(
                      registerCurrentViewIndex(
                        props.eachSectionFirstPageIndex[props.SectionBeforeContact] + index
                      )
                    );
                    props.dispatch(
                      registerViewBeforeContact(
                        props.eachSectionFirstPageIndex[props.SectionBeforeContact] + index
                      )
                    );
                  }}
                  style={{color: ColouringOfSelected(
                    'subHeader',
                    props.ViewBeforeContact &&
                    props.eachSectionFirstPageIndex,
                    props.CurrentViewIndex,
                    index
                  )}}
                  key={currentSectionsSubHeaderItem}
                  className={each_item_wrapper}
                >
                  {currentSectionsSubHeaderItem}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const mapStateToProps = store => ({
  AllSections: store.AllSections,
  SectionBeforeContact: store.SectionBeforeContact,
  allPagesUrls: store.AllPages.allPagesUrls,
  allViewsFlat: store.AllPages.allViewsFlat,
  ViewBeforeContact: store.ViewBeforeContact,
  CurrentViewIndex: store.CurrentViewIndex,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews,
  isProgressBarPausedManually: store.ProgressBar.isProgressBarPausedManually,
  isProgressBarPausedByRevisiting: store.ProgressBar.isProgressBarPausedByRevisiting,
  isProgressBarPausedByTouchEvent: store.ProgressBar.isProgressBarPausedByTouchEvent,
  currentGuideIndex: store.Guide.currentGuideIndex
});

export default connect(mapStateToProps)(SubHeader);