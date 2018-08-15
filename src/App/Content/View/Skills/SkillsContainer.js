import React, {Component} from 'react';

import Skills from './Skills';

class SkillsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileLeft: [],
      mobileRight: [],
      desktopLeft: [],
      desktopMiddle: [],
      desktopRight: []
    };
  }
  componentDidMount() {
    const state = this.state;
    const props = this.props;
    if(props.data) {
      let skillsConvertedToArray = Object.keys(props.data).map((value, index) => {
        if(props.data[index]) {
          return props.data[index];
        }
        return null;
      });
      skillsConvertedToArray = skillsConvertedToArray.filter(item => {
        if(item) {
          return item;
        }
        return null;
      });
      if(state.mobileLeft.length === 0 &&
        state.mobileRight.length === 0
      ) {
        const mobileLeft = [];
        const mobileRight = [];
        skillsConvertedToArray.map(skill => {
          if(skill.length <= 10) {
            return mobileLeft.push(skill);
          }
          return mobileRight.push(skill);
        });
        let differenceInLengthInLeftAndRight = mobileLeft.length - mobileRight.length;
        for(let i = 0; i < differenceInLengthInLeftAndRight/2; i++) {
          mobileRight.push(mobileLeft[mobileLeft.length-1]);
          mobileLeft.pop();
        }
        this.setState({
          mobileLeft,
          mobileRight
        });
      }
      if(state.desktopLeft.length === 0 &&
        state.desktopMiddle.length === 0 &&
        state.desktopRight.length === 0
      ) {
        const desktopLeft = [];
        const desktopMiddle = [];
        const desktopRight = [];
        let maximumPerColumn = Math.floor(skillsConvertedToArray.length/3);
        skillsConvertedToArray.map(skill => {
          if(skill.length <= 5) {
            return desktopLeft.push(skill);
          }
          else if(skill.length > 5 && skill.length <= 12) {
            return desktopMiddle.push(skill);
          }
          else if(skill.length > 12) {
            return desktopRight.push(skill);
          }
          return null;
        });
        desktopMiddle.map((skill, index) => {
          if(index > maximumPerColumn-3) {
            desktopRight.push(desktopMiddle[index]);
            desktopMiddle.splice(index, 1);
          }
          return null;
        });
        desktopLeft.map((skill, index) => {
          if(index > maximumPerColumn) {
            desktopMiddle.push(desktopLeft[index]);
            desktopLeft.splice(index, 1);
          }
          return null;
        });
        this.setState({
          desktopLeft,
          desktopMiddle,
          desktopRight
        });
      }
    }
  }
  render() {
    const state = this.state;
    return(
      <Skills
        mobileLeft={state.mobileLeft}
        mobileRight={state.mobileRight}
        desktopLeft={state.desktopLeft}
        desktopMiddle={state.desktopMiddle}
        desktopRight={state.desktopRight}
      />
    );
  }
}

export default SkillsContainer;