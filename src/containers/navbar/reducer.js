// reducer

const initialState = {
  backPage: '/menu',
  nameOfPage: 'Menu'
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME': {
      return { ...state, nameOfPage: action.payload.newName };
    }
    case 'CHANGE_BACK_URL': {
      return { ...state, backPage: action.payload.backUrl };
    }
    default:
      return state;
  }
};

export default postReducer;
