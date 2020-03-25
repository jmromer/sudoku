import reducer from './reducer'

export * from './actions'
export * from './interfaces'

export type MainReducer = ReturnType<typeof reducer>
export default reducer
