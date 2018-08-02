export const REGISTER_ALL_VIEWS_FLAT = 'REGISTER_ALL_VIEWS_FLAT';
export const REGISTER_EACH_SECTION_FIRST_PAGE_INDEX = 'REGISTER_EACH_SECTION_FIRST_PAGE_INDEX';
export const REGISTER_ALL_PAGES_URLS = 'REGISTER_ALL_PAGES_URLS';

export const registerAllViewsFlat = allViewsFlat => ({
  type: REGISTER_ALL_VIEWS_FLAT,
  payload: allViewsFlat
});

export const registerEachSectionFirstPageIndex = eachSectionFirstPageIndex => ({
  type: REGISTER_EACH_SECTION_FIRST_PAGE_INDEX,
  payload: eachSectionFirstPageIndex
});

export const registerAllPagesUrls = allPagesUrls => ({
  type: REGISTER_ALL_PAGES_URLS,
  payload: allPagesUrls
});