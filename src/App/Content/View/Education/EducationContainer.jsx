import React, {Component} from 'react';
import {connect} from 'react-redux';

import style from './EducationContainer.scss';
import Laptop from '../../../../Assets/Static/Laptop.png';
import {
  setEducationImageIntervalIndex,
  startEducationImageInterval
} from '../../../../Actions/EducationImageInterval';

class EducationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageWidth: 0,
      multipleImagesMarginLeft: 0
    };
    if(!props.hasEducationImageIntervalStarted) {
      props.dispatch(startEducationImageInterval());
    }
  }
  componentDidMount() {
    const props = this.props;
    this.registerImageWidth();
    this.registerMultipleImagesMarginLeft(props);
  }
  registerImageWidth = () => {
    const props = this.props;
    if(
      !this.image ||
      this.image.clientWidth < 2
    ) {
      setTimeout(() => {
        this.registerImageWidth();
      });
      return;
    }
    if(
      this.image &&
      this.image.clientWidth > 2 &&
      this.state.imageWidth !== this.image.clientWidth
    ) {
      this.setState({
        imageWidth: this.image.clientWidth
      },() => {
        this.registerMultipleImagesMarginLeft(props);
      });
    }
  };
  registerMultipleImagesMarginLeft = (nextProps) => {
    const state = this.state;
    if(nextProps.educationImageIntervalImageIndex === 0) {
      this.setState({multipleImagesMarginLeft: 0});
    }
    else if(nextProps.educationImageIntervalImageIndex === 1) {
      this.setState({multipleImagesMarginLeft: `calc(-${state.imageWidth}px - 50px)`});
    }
  };
  componentWillReceiveProps(nextProps) {
    this.registerMultipleImagesMarginLeft(nextProps);
  }
  render() {
    const {
      education,
      main_title_long,
      main_title_short,
      subtitle,
      url,
      laptop_desktop_images_wrapper,
      laptop,
      laptop_outline,
      laptop_black_background,
      laptop_footage,
      multiple_images_wrapper,
      multiple_images,
      toggles_wrapper,
      toggle_button,
      desktop_image,
      mobile_image,
      single_image,
      image_switcher,
      completed
    } = style;
    const props = this.props;
    const state = this.state;
    return (
      <div className={education}>
        <div
          className={
            props.data.mainTitle.length > 14 ?
              main_title_long :
              main_title_short
          }
        >
          {props.data.mainTitle}
        </div>
        <div className={subtitle}>
          {props.data.subTitle}
        </div>
        <div>
          <a
            href={props.data.url}
            target='_blank'
            className={url}
          >
            {props.data.url}
          </a>
        </div>
        {props.data.laptop && (
          <div className={laptop_desktop_images_wrapper}>
            {props.data.images.length > 1 && (
              <img
                alt='Images'
                key={props.data.images[0]}
                className={desktop_image}
                src={props.data.images[0]}
              />
            )}
            <div className={laptop}>
              <img
                alt='Laptop outline'
                className={laptop_outline}
                src={props.laptopOutline}
              />
              <div className={laptop_black_background}/>
              <video
                src={props.data.laptop}
                className={laptop_footage}
                autoPlay
                loop
                muted
                playsInline
                webkit-playsinline='true'
              />
            </div>
            {props.data.images.length > 1 && (
              <img
                alt='Images'
                key={props.data.images[1]}
                className={desktop_image}
                src={props.data.images[1]}
              />
            )}
          </div>
        )}
        <div
          className={multiple_images_wrapper}
          style={{
            width: state.imageWidth !== 0 && state.imageWidth,
            opacity: state.imageWidth === 0 ? 0 : 1
          }}
        >
          {props.data.images.length > 1 && (
            <div
              className={multiple_images}
              style={{
                marginLeft: state.multipleImagesMarginLeft
              }}
            >
              <img
                alt='Images'
                key={props.data.images[0]}
                ref={image => this.image = image}
                className={mobile_image}
                style={{
                  minWidth: state.imageWidth !== 0 && state.imageWidth,
                  maxWidth: state.imageWidth !== 0 && state.imageWidth,
                  width: state.imageWidth !== 0 && state.imageWidth,
                }}
                src={props.data.images[0]}
              />
              <img
                alt='Images'
                key={props.data.images[1]}
                className={mobile_image}
                style={{
                  minWidth: state.imageWidth !== 0 && state.imageWidth,
                  maxWidth: state.imageWidth !== 0 && state.imageWidth,
                  width: state.imageWidth !== 0 && state.imageWidth,
                }}
                src={props.data.images[1]}
              />
            </div>
          )}
        </div>
        {props.data.images.length > 1 && (
          <div className={toggles_wrapper}>
            <div
              className={toggle_button}
              style={{
                backgroundColor: props
                  .educationImageIntervalImageIndex === 0 && '#b338f7'
              }}
              onClick={() => props.dispatch(setEducationImageIntervalIndex(0))}
            />
            <div
              className={toggle_button}
              style={{
                backgroundColor: props
                  .educationImageIntervalImageIndex === 1 && '#b338f7'
              }}
              onClick={() => props.dispatch(setEducationImageIntervalIndex(1))}
            />
          </div>
        )}
        {props.data.images.length === 1 && (
          <img
            alt='Images'
            className={[mobile_image, single_image].join(' ')}
            src={props.data.images[0]}
          />
        )}
        <div className={image_switcher}>
        </div>
        <div className={completed}>
          <span>
            Completed:
          </span>
          &nbsp;
          <span>
            {props.data.monthCompleted}
          </span>
          &nbsp;
          <span>
            {props.data.yearCompleted}
          </span>
        </div>
      </div>
    );
  }
}

EducationContainer.defaultProps = {
  laptopOutline: Laptop
};

const mapStateToProps = store => ({
  hasEducationImageIntervalStarted: store.EducationImageInterval.hasEducationImageIntervalStarted,
  educationImageIntervalImageIndex: store.EducationImageInterval.educationImageIntervalImageIndex
});

export default connect(mapStateToProps)(EducationContainer);