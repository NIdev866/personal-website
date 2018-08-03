const MainMenuOpacity = (isMainMenuOpen, zoomOutPercentage) => {
  if(isMainMenuOpen) {
    return 100;
  }
  else if (isNaN(zoomOutPercentage/100)) {
    return 0;
  }
  return zoomOutPercentage/100;
};

export default MainMenuOpacity;