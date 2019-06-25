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
    default:
      return state;
  }
};

export default postReducer;
