const ViewLeftPosition = (
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
    return 0;
  }
  if(event === 'twoFingerSideSwipe') {
    if(
      SectionBeforeContact === 4 &&
      sideSwipeDistance <= 0
    ) {
      return 0;
    }
    return Math.floor(sideSwipeDistance);
  }
  if(!isNaN(sideSwipeDistance)) {
    return Math.floor(sideSwipeDistance)/6;
  }
  else return 0;
};

export default ViewLeftPosition;