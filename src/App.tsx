import React, { FC } from 'react';

import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { Card, Content, Grid, Title } from 'components'
import { configureStore } from 'core'
import { GlobalStyles, theme } from 'styles'

const store = configureStore()

// NB: <> is shorthand for <Fragment>
const App: FC = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Provider store={store}>
            <Content data-cy="content">
                <Title data-cy="title">Sudoku</Title>
                <Card data-cy="card">
                    <Grid data-cy="grid" />
                </Card>
            </Content>
        </Provider>
    </ThemeProvider>
)

export default App;
