import React, { FC } from 'react';
import { GlobalStyles } from './styles';

// NB: <> is shorthand for <Fragment>
const App: FC = () => (
    <>
        <GlobalStyles />
        <div>
            hello world!
        </div>
    </>
)

export default App;
