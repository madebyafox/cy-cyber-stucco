import {Map} from 'immutable'
import 'whatwg-fetch'

const LOAD_LS = 'LOAD_LS'
const ADD_ALL_LS = 'ADD_ALL_LS'
const ADD_LS = 'ADD_LS'
const REMOVE_LS = 'REMOVE_LS'
const REMOVE_ALL_LS = 'REMOVE_ALL_LS'

const defaultState = Map({
  default: []
})


export default function layoutStyleState(state = defaultState, action) {

  switch (action.type) {
    case ADD_ALL_LS:
      return Map(action.layouts)
    case ADD_LS:
      return state.set(action.lsName, action.layout)
    case REMOVE_LS:
      return state.delete(action.lsName)
    case REMOVE_ALL_LS:
      return defaultState
    default:
      return state
  }
}

export function fetchLayoutStyles(url) {

  return dispatch => fetch(url)
    .then(res => {
      return res.json()
    })
    .then(payload => {
      const layoutMap = {}
      payload.map(ls => {
        layoutMap[ls.title] = ls.layout
      })
      return dispatch(addLayouts(layoutMap))
    })
    .catch(error => { error });
}


export function addLayouts(layouts) {
  return {
    type: ADD_ALL_LS,
    layouts: layouts,
  }
}

export function addLayout(lsName, layout) {
  return {
    type: ADD_LS,
    lsName: lsName,
    layout: layout
  }
}

export function removeLs(lsName) {
  return {
    type: REMOVE_LS,
    lsName: lsName
  }
}

export function removeAllLs() {
  return {
    type: REMOVE_ALL_LS
  }
}
