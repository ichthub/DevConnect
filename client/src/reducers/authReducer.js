import { SET_CURRENT_USER } from '../actions/type';
import isEmpty from '../validation/is-empty';

const intialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
