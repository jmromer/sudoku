import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components'

import { Content, Title, Card, Grid } from './components'
import { GlobalStyles, theme } from './styles'

// NB: <> is shorthand for <Fragment>
const App: FC = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Content data-cy="content">
            <Title data-cy="title">Sudoku</Title>
            <Card data-cy="card">
                <Grid data-cy="grid" />
            </Card>
        </Content>
    </ThemeProvider>
)

export default App;
