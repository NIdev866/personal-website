const ViewSwipeScale = (
  sideSwipeDistance,
  event,
  ViewBeforeContact,
  SectionBeforeContact,
  allPagesUrls
) => {
  if(
    (
      ViewBeforeContact === 0 &&
      sideSwipeDistance >= 0
    ) ||
    (
      allPagesUrls !== null &&
      ViewBeforeContact === allPagesUrls.length-2 &&
      sideSwipeDistance <= 0
    )
  ) {
    return 1;
  }
  let sideSwipeDistanceNegative = sideSwipeDistance;
  if(sideSwipeDistance > 0) {
    sideSwipeDistanceNegative = 0 - sideSwipeDistance;
  }
  if(event === 'twoFingersSideSwipe') {
    if(
      SectionBeforeContact === 4 &&
      sideSwipeDistance <= 0
    ) {
      return 1;
    }
    return 1 + (Math.floor(sideSwipeDistanceNegative))/2000;
  }
  if(!isNaN(sideSwipeDistance)) {
    return 1 + (Math.floor(sideSwipeDistanceNegative)/6)/2000;
  }
  else return 1;
};

export default ViewSwipeScale;