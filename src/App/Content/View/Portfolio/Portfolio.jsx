import React from 'react';

import style from './Portfolio.scss';
import Mobile from '../../../../Assets/Static/Mobile.png';
import Laptop from '../../../../Assets/Static/Laptop.png';
import FileExtension from '../../../../Utils/FileExtension';

const Portfolio = props => {
  const {
    portfolio,
    bigger_text,
    footage_description_wrapper,
    footage_container,
    mobile_container,
    mobile_black_background,
    mobile_outline,
    mobile_footage,
    laptop_outline,
    laptop_black_background,
    laptop_footage,
    description_wrapper,
    description
  } = style;
  return (
    <div className={portfolio}>
      <div className={bigger_text}>
        {props.data.headerTitle}
      </div>
      {props.data.company && (
        <div className={bigger_text}>
          (
          {props.data.company}
          )
        </div>
      )}
      <div className={footage_description_wrapper}>
        <div className={footage_container}>
          <div className={mobile_container}>
            <div className={mobile_black_background} />
            <img
              alt='Mobile outline'
              src={props.mobileOutline}
              className={mobile_outline}
            />
            {!props.footageUpdating && FileExtension(props.data.laptop) === 'mp4' && (
              <video
                src={props.data.mobile}
                className={mobile_footage}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline='true'
              />
            )}
            {FileExtension(props.data.laptop) === 'png' && (
              <img
                alt='Mobile footage'
                src={props.data.mobile}
                className={mobile_footage}
              />
            )}
          </div>
          <img
            alt='Laptop outline'
            src={props.laptopOutline}
            className={laptop_outline}
          />
          <div className={laptop_black_background} />
          {!props.footageUpdating && FileExtension(props.data.laptop) === 'mp4' && (
            <video
              src={props.data.laptop}
              className={laptop_footage}
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline='true'
            />
          )}
          {FileExtension(props.data.laptop) === 'png' && (
            <img
              alt='Laptop footage'
              src={props.data.laptop}
              className={laptop_footage}
            />
          )}
        </div>
        <div className={description_wrapper}>
          <div className={description}>
            {props.data.description}
          </div>
        </div>
      </div>
    </div>
  );
};

Portfolio.defaultProps = {
  laptopOutline: Laptop,
  mobileOutline: Mobile
};

export default Portfolio;