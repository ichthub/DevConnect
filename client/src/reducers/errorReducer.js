import { GET_ERRORS } from '../actions/type';

const intialState = {};

export default (state = intialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
