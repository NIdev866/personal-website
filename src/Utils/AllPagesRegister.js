import {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {
  registerAllViewsFlat,
  registerEachSectionFirstPageIndex,
  registerAllPagesUrls
} from '../Actions/AllPages';
import {registerCurrentViewIndex} from '../Actions/CurrentViewIndex';
import {registerCurrentSectionIndex} from '../Actions/CurrentSectionIndex';
import {
  about as aboutData,
  experience as experienceData,
  portfolio as portfolioData,
  skills as skillsData,
  education as educationData,
} from '../data';

class AllPagesRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCurrentSectionIndexLoaded: false
    };
  }
  componentDidMount() {
    const props = this.props;
    const allViewsFlat = [];
    const eachSectionFirstPageIndex = [];
    const allPagesUrls = [];
    eachSectionFirstPageIndex.push(allViewsFlat.length);
    allViewsFlat.push({...aboutData, SECTION_NAME: 'About'});
    allPagesUrls.push('/About');
    eachSectionFirstPageIndex.push(allViewsFlat.length);
    experienceData.map((workplace, index) => {
      allViewsFlat.push({...workplace, SECTION_NAME: 'Experience', SECTIONS_INDEX: index});
      return allPagesUrls.push(
        `/Experience/${workplace.headerTitle.replace(/\s+/g, '_')}`
      );
    });
    eachSectionFirstPageIndex.push(allViewsFlat.length);
    portfolioData.map((project, index) => {
      allViewsFlat.push({...project, SECTION_NAME: 'Portfolio', SECTIONS_INDEX: index});
      return allPagesUrls.push(
        `/Portfolio/${project.headerTitle.replace(/\s+/g, '_')}`
      );
    });
    eachSectionFirstPageIndex.push(allViewsFlat.length);
    allViewsFlat.push({...skillsData, SECTION_NAME: 'Skills'});
    allPagesUrls.push('/Skills');
    eachSectionFirstPageIndex.push(allViewsFlat.length);
    educationData.map((study, index) => {
      allViewsFlat.push({...study, SECTION_NAME: 'Education', SECTIONS_INDEX: index});
      return allPagesUrls.push(
        `/Education/${study.headerTitle.replace(/\s+/g, '_')}`
      );
    });
    allPagesUrls.push('/Contact');
    props.dispatch(registerAllViewsFlat(allViewsFlat));
    props.dispatch(registerEachSectionFirstPageIndex(eachSectionFirstPageIndex));
    props.dispatch(registerAllPagesUrls(allPagesUrls));
    this.allPagesRegisterHandler();
  }
  allPagesRegisterHandler = () => {
    const props = this.props;
    const state = this.state;
    if(props.allViewsFlat && props.allPagesUrls) {
      let currentUrlExistsInAllPagesUrls = false;
      props.allPagesUrls.map((url, index) => {
        if(props.location.pathname.toLowerCase().indexOf('/contact') !== 0) {
          if(props.location.pathname.toLowerCase().indexOf(url.toLowerCase()) === 0) {
            currentUrlExistsInAllPagesUrls = true;
            if(props.location.pathname === props.allPagesUrls[index]) {
              props.dispatch(registerCurrentViewIndex(index));
              if(!state.initialCurrentSectionIndexLoaded) {
                props.dispatch(registerCurrentViewIndex(index));
                this.setState({initialCurrentSectionIndexLoaded: true},() => {
                  let valueForInitialViewIndex = null;
                  props.eachSectionFirstPageIndex.map((eachSectionFirstPageIndex, eachSectionActualIndex) => {
                    if(eachSectionFirstPageIndex <= index) {
                      valueForInitialViewIndex = eachSectionActualIndex;
                    }
                    return true;
                  });
                  props.dispatch(registerCurrentSectionIndex(valueForInitialViewIndex));
                });
              }
              else {
                props.dispatch(registerCurrentViewIndex(index));
              }
            }
          }
        }
        return true;
      });
      if(!currentUrlExistsInAllPagesUrls) {
        if(props.location.pathname !== props.allPagesUrls[0]) {
          props.dispatch(registerCurrentViewIndex(0));
          props.dispatch(registerCurrentSectionIndex(0));
        }
      }
    }
  };
  render() {
    return null;
  }
}

const mapStateToProps = store => ({
  allViewsFlat: store.AllPages.allViewsFlat,
  eachSectionFirstPageIndex: store.AllPages.eachSectionFirstPageIndex,
  allPagesUrls: store.AllPages.allPagesUrls,
});

export default withRouter(connect(mapStateToProps)(AllPagesRegister));