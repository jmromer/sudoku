import React, { FC } from 'react'

import { Container, Row } from './styles'
import Block from './block'

interface GridCallback {
    (element: any, index: number): any
}

const grid = (func: GridCallback) =>
    React.Children.toArray([...Array(9)].map(func))

const Grid: FC = () => {
    return (
        <Container data-cy="grid-container">
            {grid((_, rowNum) => (
                <Row data-cy="grid-row-container">
                    {grid((_, colNum) => <Block col={colNum} row={rowNum} />)}
                </Row>
            ))}
        </Container>
    )
}

export default Grid;
