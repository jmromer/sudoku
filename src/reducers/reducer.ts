import { AnyAction } from 'redux'

import utils from 'utils'

import { MainReducer } from './interfaces'
import * as types from './types'

const initialState: MainReducer = {}

function reducer(state = initialState, action: AnyAction): MainReducer {
    switch (action.type) {
        case (types.CREATE_GRID):
            return { ...state, grid: utils.sudoku.filled() }
        default:
            return state
    }
}

export default reducer
