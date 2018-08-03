import ContactViewHeight from './ContactViewHeight';

function ResponsiveContactViewHeight(ScreenWidth, distanceUp, platform) {
  if(platform === 'mobile') {
    if(ScreenWidth < 850) {
      if(distanceUp >= 400) {
        return '385px';
      }
      return `${ContactViewHeight(distanceUp) + 5}px`;
    }
    else {
      return '5px';
    }
  }
  else if(platform === 'desktop') {
    if(ScreenWidth >= 850) {
      if(distanceUp < 400) {
        return '-550px';
      }
      else {
        return '40px';
      }
    }
  }
  return '-550px';
}

export default ResponsiveContactViewHeight;