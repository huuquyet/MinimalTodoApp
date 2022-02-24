import {actionTypes, themeModes} from '../common/constants';

const initialState = themeModes.DARK;

export default function scheme(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_SCHEME:
      return action.scheme === themeModes.DARK
        ? themeModes.LIGHT
        : themeModes.DARK;
    default:
      return state;
  }
}
