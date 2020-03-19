import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components'

import { GlobalStyles, theme } from './styles';

// NB: <> is shorthand for <Fragment>
const App: FC = () => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div>
            hello world!
        </div>
    </ThemeProvider>
)

export default App;
