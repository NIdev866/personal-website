import {
  REGISTER_ALL_VIEWS_FLAT,
  REGISTER_EACH_SECTION_FIRST_PAGE_INDEX,
  REGISTER_ALL_PAGES_URLS,
} from '../Actions/AllPages';

const defaultState = {
  allViewsFlat: null,
  eachSectionFirstPageIndex: null,
  allPagesUrls: null,
};

function AllPagesReducer(state = defaultState, action) {
  switch(action.type) {
  case REGISTER_ALL_VIEWS_FLAT:
    return {...state, allViewsFlat: action.payload};
  case REGISTER_EACH_SECTION_FIRST_PAGE_INDEX:
    return {...state, eachSectionFirstPageIndex: action.payload};
  case REGISTER_ALL_PAGES_URLS:
    return {...state, allPagesUrls: action.payload};
  default:
    return state;
  }
}

export default AllPagesReducer;