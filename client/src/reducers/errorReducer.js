import { GET_ERRORS, CLEAR_ERRORS } from '../actions/type';

const intialState = {};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
