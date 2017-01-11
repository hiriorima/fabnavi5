import Debug from 'debug';

const debug = Debug('fabnavi:reducer:user');

const initialState = {
  isLoggedIn: false,
  credential: {
    accessToken: '',
    client: '',
    uid: '',
  },
  id: ''
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'SIGNED_IN':
      return Object.assign({}, state, {
        isLoggedIn: true,
        credential: action.credential,
        id: action['id'] ? action.id : ''
      });
    default:
      return state;
  }
}
