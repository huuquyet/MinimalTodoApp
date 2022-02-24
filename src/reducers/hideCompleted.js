import {actionTypes} from '../common/constants';

const initialState = false;

export default function hideCompleted(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_COMPLETED:
      return !action.hideCompleted;
    default:
      return state;
  }
}
