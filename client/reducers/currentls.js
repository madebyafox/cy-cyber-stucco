import { Map } from 'immutable'

const SET_CURRENT_LS = 'SET_CURRENT_LS'

const defaultState = Map({
  lsName: 'preset'
})

export default function currentLayoutStyleState(state = defaultState, action) {

  switch (action.type) {
    case SET_CURRENT_LS:
      return state.set('lsName', action.lsName)
    default:
      return state
  }
}

export function setCurrentLs(lsName) {
  return {
    type: SET_CURRENT_LS,
    lsName: lsName
  }
}
