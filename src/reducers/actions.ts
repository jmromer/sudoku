import { Action, AnyAction } from 'redux'

import { COORD } from 'typings'
import * as types from './types'

export const createGrid = (): Action => ({ type: types.CREATE_GRID })

export const selectBlock = (coords: COORD): AnyAction => ({
    coords,
    type: types.SELECT_BLOCK,
})
