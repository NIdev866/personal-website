const NextViewIsInNextSection = (
  nextViewIndex,
  SectionBeforeContact,
  eachSectionFirstPageIndex
) => {
  if(eachSectionFirstPageIndex[SectionBeforeContact+1] <= nextViewIndex) {
    return true;
  }
  return false;
};

export default NextViewIsInNextSection;