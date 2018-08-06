import React from 'react';

import style from './Loading.scss';
import ReactLogo from '../../Assets/Static/React.png';

const Loading = props => {
  const {
    react_logo_wrapper,
    react_logo,
    top_left,
    bottom_right
  } = style;
  return (
    <div>
      {!props.hasBackgroundLoaded && (
        <div className={react_logo_wrapper}>
          <img alt='React logo' src={props.reactLogoImage} className={react_logo}/>
        </div>
      )}
      <div
        className={top_left}
        style={{left: props.topLeftLeft}}
      />
      <div
        className={bottom_right}
        style={{left: props.topLeftLeft}}
      />
    </div>
  );
}

Loading.defaultProps = {
  reactLogoImage: ReactLogo
}

export default Loading;