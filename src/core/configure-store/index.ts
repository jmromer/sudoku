import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

import reducer from 'reducers'

export function configureStore(initialState = {}) {
    const store = createStore(
        reducer,
        initialState,
        devToolsEnhancer({})
    )

    return store
}
