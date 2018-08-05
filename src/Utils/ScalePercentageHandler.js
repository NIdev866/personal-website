function ScalePercentageHandler(zoomOutPercentage) {
  if(!zoomOutPercentage) {
    return 'scale(1)';
  }
  if(zoomOutPercentage > 90) {
    return 'scale(0.87)';
  }
  else {
    return `scale(0.${Math.floor(100 - (zoomOutPercentage/8))})`;
  }
}

export default ScalePercentageHandler;