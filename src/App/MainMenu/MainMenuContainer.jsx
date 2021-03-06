import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import style from './MainMenuContainer.scss';
import MainMenuOpacity from '../../Utils/MainMenuOpacity';
import MainMenuItemClick from '../../Utils/MainMenuItemClick';
import CorrectStateForSubMenu from '../../Utils/CorrectStateForSubMenu';
import SubMenuItemClick from '../../Utils/SubMenuItemClick';
import ColouringOfSelected from '../../Utils/ColouringOfSelected';
import {registerSubMenuOpened} from '../../Actions/SubMenuOpened';

class MainMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experienceSubMenuWrapperHeight: null,
      portfolioSubMenuWrapperHeight: null,
      educationSubMenuWrapperHeight: null,
      areHeightsRegistered: false,
      allMainHeadersWithAllTheirSubMenuItems: {},
      widestItemInEachSubMenu: {}
    };
  }
  componentDidUpdate() {
    const state = this.state;
    const props = this.props;
    const allMainHeadersWithAllTheirSubMenuItems = {};
    if(
      props.allViewsFlat &&
      props.allPagesUrls &&
      props.SectionBeforeContact !== null &&
      props.AllSections
    ) {
      props.allViewsFlat.map(viewFlat => {
        if(allMainHeadersWithAllTheirSubMenuItems[viewFlat.SECTION_NAME] === undefined) {
          allMainHeadersWithAllTheirSubMenuItems[viewFlat.SECTION_NAME] = [];
        }
        allMainHeadersWithAllTheirSubMenuItems[viewFlat.SECTION_NAME].push(viewFlat.headerTitle);
        return true;
      });
    }
    Object.keys(allMainHeadersWithAllTheirSubMenuItems).map((mainHeader, mainHeaderIndex) => {
      allMainHeadersWithAllTheirSubMenuItems[mainHeader].map((subMenu, subMenuItemIndex) => {
        if(
          this[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`] !== null &&
          this[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`] !== undefined &&
          state[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`] === undefined
        ) {
          this.setState({
            [`header${mainHeaderIndex}subMenu${subMenuItemIndex}`]:
            this[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`].offsetWidth
          });
        }
        return null;
      });
      return null;
    });
    let allSubMenuWidthsRegistered = true;
    let widestItemInEachSubMenu = {};
    Object.keys(allMainHeadersWithAllTheirSubMenuItems).map((mainHeader, mainHeaderIndex) => {
      allMainHeadersWithAllTheirSubMenuItems[mainHeader].map((subMenu, subMenuItemIndex) => {
        if(state[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`] === undefined) {
          allSubMenuWidthsRegistered = false;
        }
        return null;
      });
      return null;
    });
    if(allSubMenuWidthsRegistered) {
      Object.keys(allMainHeadersWithAllTheirSubMenuItems).map((mainHeader, mainHeaderIndex) => {
        allMainHeadersWithAllTheirSubMenuItems[mainHeader].map((subMenu, subMenuItemIndex) => {
          if(
            widestItemInEachSubMenu[`header${mainHeaderIndex}`] === undefined ||
            widestItemInEachSubMenu[`header${mainHeaderIndex}`] <
              state[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`]
          )
            widestItemInEachSubMenu[`header${mainHeaderIndex}`] =
              state[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`];
          return null;
        });
        return null;
      });
    }
    if(
      allMainHeadersWithAllTheirSubMenuItems !== {} &&
      JSON.stringify(allMainHeadersWithAllTheirSubMenuItems) !==
        JSON.stringify(state.allMainHeadersWithAllTheirSubMenuItems)
    ) {
      this.setState({allMainHeadersWithAllTheirSubMenuItems});
    }
    if(
      widestItemInEachSubMenu !== {} &&
      JSON.stringify(widestItemInEachSubMenu) !==
        JSON.stringify(state.widestItemInEachSubMenu)
    ) {
      this.setState({widestItemInEachSubMenu});
    }
    if(
      this.experienceSubMenuWrapper.clientHeight > 2 &&
      this.portfolioSubMenuWrapper.clientHeight > 2 &&
      this.educationSubMenuWrapper.clientHeight > 2
    ) {
      if(
        state.experienceSubMenuWrapperHeight === null ||
        state.portfolioSubMenuWrapperHeight === null ||
        state.educationSubMenuWrapperHeight === null
      ) {
        this.setState({
          experienceSubMenuWrapperHeight: this.experienceSubMenuWrapper.clientHeight + 4,
          portfolioSubMenuWrapperHeight: this.portfolioSubMenuWrapper.clientHeight + 4,
          educationSubMenuWrapperHeight: this.educationSubMenuWrapper.clientHeight + 4
        });
      }
    }
    if(
      props.CurrentSectionIndex !== null &&
      props.SubMenuOpened === null
    ) {
      props.dispatch(registerSubMenuOpened(props.CurrentSectionIndex));
    }
    if(
      state.experienceSubMenuWrapperHeight !== null &&
      state.portfolioSubMenuWrapperHeight !== null &&
      state.educationSubMenuWrapperHeight !== null &&
      props.SubMenuOpened !== null &&
      !state.areHeightsRegistered
    ) {
      this.setState({areHeightsRegistered: true});
    }
  }
  render() {
    const {
      main_menu_wrapper,
      main_menu,
      all_items_wrapper,
      header_item,
      main_menu_item,
      submenu_parent_wrapper,
      top_border,
      bottom_border,
      submenu_wrapper,
      submenu
    } = style;
    const props = this.props;
    const state = this.state;
    return (
      <div
        className={main_menu_wrapper}
        style={{
          display: state.areHeightsRegistered ?
            props.mainMenuDisplayPropertyState :
            'block',
          opacity: MainMenuOpacity(props.isMainMenuOpen, props.zoomOutPercentage),
          transition: props.transitionState
        }}
      >
        <div className={main_menu}>
          <div className={all_items_wrapper}>
            <div
              style={{
                transform: props.isMainMenuOpen ?
                  'scale(1)' :
                  `scale(${(100+(100-props.zoomOutPercentage))/100})`,
                transition: props.transitionState
              }}
            >
              {props.AllSections && props.AllSections.map((Section, mainHeaderIndex) => (
                <div
                  key={Section}
                  className={header_item}
                  style={{
                    color: props.CurrentSectionIndex === mainHeaderIndex && '#b338f7'
                  }}
                >
                  <div
                    className={main_menu_item}
                    onClick={() => MainMenuItemClick(
                      mainHeaderIndex,
                      Section,
                      props
                    )}
                  >
                    {Section}
                  </div>
                  <div
                    style={{
                      height: CorrectStateForSubMenu(state, props.SubMenuOpened, Section)
                    }}
                    className={submenu_parent_wrapper}
                  >
                    <div
                      className={top_border}
                      style={{width:
                        !isNaN(state.widestItemInEachSubMenu[`header${mainHeaderIndex}`]) &&
                          state.widestItemInEachSubMenu[`header${mainHeaderIndex}`] - 15
                      }}
                    />
                    <div
                      className={bottom_border}
                      style={{width:
                        !isNaN(state.widestItemInEachSubMenu[`header${mainHeaderIndex}`]) &&
                        state.widestItemInEachSubMenu[`header${mainHeaderIndex}`] - 15
                      }}
                    />
                    <div
                      className={submenu_wrapper}
                      ref={subMenuWrapper => {
                        switch(Section) {
                        case 'Experience':
                          return this.experienceSubMenuWrapper = subMenuWrapper;
                        case 'Portfolio':
                          return this.portfolioSubMenuWrapper = subMenuWrapper;
                        case 'Education':
                          return this.educationSubMenuWrapper = subMenuWrapper;
                        default:
                          return null;
                        }
                      }}
                    >
                      <div key={submenu} className={submenu}>
                        {Object.keys(state.allMainHeadersWithAllTheirSubMenuItems).map(sectionName => {
                          if(
                            sectionName === Section &&
                            state.allMainHeadersWithAllTheirSubMenuItems[sectionName].length > 0
                          ) {
                            return state.allMainHeadersWithAllTheirSubMenuItems[sectionName].map((
                              subMenuItem,
                              subMenuItemIndex
                            ) => {
                              return (
                                <div
                                  key={`${Section}${subMenuItem}`}
                                  onClick={() => SubMenuItemClick(
                                    mainHeaderIndex,
                                    subMenuItemIndex,
                                    props
                                  )}
                                  style={{
                                    color: ColouringOfSelected(
                                      'mainMenu',
                                      props.ViewBeforeContact,
                                      props.eachSectionFirstPageIndex,
                                      props.CurrentViewIndex,
                                      props.SectionBeforeContact,
                                      mainHeaderIndex,
                                      subMenuItemIndex
                                    )
                                  }}
                                >
                                  <span
                                    ref={subMenuItem => {
                                      this[`header${mainHeaderIndex}subMenu${subMenuItemIndex}`] =
                                        subMenuItem;
                                    }}
                                  >
                                    {subMenuItem}
                                  </span>
                                </div>
                              );
                            });
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  AllSections: store.AllSections,
  CurrentSectionIndex: store.CurrentSectionIndex,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  allPagesUrls: store.AllPages.allPagesUrls,
  allViewsFlat: store.AllPages.allViewsFlat,
  SectionBeforeContact: store.SectionBeforeContact,
  ViewBeforeContact: store.ViewBeforeContact,
  CurrentViewIndex: store.CurrentViewIndex,
  SubMenuOpened: store.SubMenuOpened,
  previouslyOpenedViews: store.ProgressBar.previouslyOpenedViews,
  currentGuideIndex: store.Guide.currentGuideIndex
});

export default withRouter(connect(mapStateToProps)(MainMenuContainer));