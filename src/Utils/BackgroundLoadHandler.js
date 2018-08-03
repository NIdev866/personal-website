import Background from '../Assets/Static/Background.png';

const BackgroundLoadHandler = hasBackgroundLoadedHandler => {
  let bgImg = new Image();
  bgImg.onload = () => {
    document.querySelector('[class^="app_container-App"]').style.backgroundImage = 'url(' + bgImg.src + ')';
    hasBackgroundLoadedHandler();
  };
  bgImg.src = Background;
};

export default BackgroundLoadHandler;