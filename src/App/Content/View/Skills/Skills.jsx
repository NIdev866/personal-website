import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import style from './Skills.scss';

const Skills = props => {
  const {
    skills_wrapper,
    skills,
    vertical_divide
  } = style;
  return(
    <div className={skills_wrapper}>
      {props.ScreenWidth < 850 ? (
        <div className={skills}>
          <div>
            {props.mobileLeft && props.mobileLeft.map(skill => (
              <div key={skill}>{skill}</div>
            ))}
          </div>
          <div className={vertical_divide}/>
          <div>
            {props.mobileRight && props.mobileRight.map(skill => (
              <div key={skill}>{skill}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className={skills}>
          <div>
            {props.desktopLeft && props.desktopLeft.map(skill => (
              <div key={skill}>{skill}</div>
            ))}
          </div>
          <div className={vertical_divide}/>
          <div>
            {props.desktopMiddle && props.desktopMiddle.map(skill => (
              <div key={skill}>{skill}</div>
            ))}
          </div>
          <div className={vertical_divide}/>
          <div>
            {props.desktopRight && props.desktopRight.map(skill => (
              <div key={skill}>{skill}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = store => ({
  ScreenWidth: store.ScreenWidth
});

export default withRouter(connect(mapStateToProps)(Skills));