const defaultState = [
  'About',
  'Experience',
  'Portfolio',
  'Skills',
  'Education',
  'Contact'
];

function AllSectionsReducer(state = defaultState, action) {
  switch(action.type) {
  default:
    return state;
  }
}

export default AllSectionsReducer;