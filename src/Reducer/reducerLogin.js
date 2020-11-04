import { LOGIN } from '../Action/actionLogin';

const initialState = {
  name: "",
  email: "",
}
function reducerLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN: return { ...state, email: action.email }
    default: return state
  }
}
export default reducerLogin
