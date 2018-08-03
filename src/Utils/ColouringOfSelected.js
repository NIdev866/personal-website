const ColouringOfSelected = (
  instance,
  ViewBeforeContact,
  eachSectionFirstPageIndex,
  CurrentViewIndex,
  SectionBeforeContact,
  mainHeaderIndex,
  index
) => {
  let indexForThatParticularSection = null;
  eachSectionFirstPageIndex.map(sectionFirstPageIndex => {
    if(sectionFirstPageIndex <= ViewBeforeContact) {
      indexForThatParticularSection = ViewBeforeContact - sectionFirstPageIndex;
    }
    return true;
  });
  if(CurrentViewIndex === ViewBeforeContact) {
    if(
      (
        instance === 'subHeader' &&
        indexForThatParticularSection === SectionBeforeContact
      ) ||
      (
        instance === 'mainMenu' &&
        indexForThatParticularSection === index &&
        SectionBeforeContact === mainHeaderIndex
      )
    ) {
      return '#b338f7';
    }
  }
  return 'white';
};

export default ColouringOfSelected;