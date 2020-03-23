import React, { FC } from 'react'

import { Container, Row } from './styles'
import Block from './block'

import fillGrid from 'utils/fill-grid'
import { GRID, VALUE, ROW } from 'typings'

interface GridCallback {
    (element: any, index: number): any
}

const array = React.Children.toArray

const Grid: FC = () => {
    const grid: GRID =
        [...Array(9)].map(_ =>
            [...Array(9)].map(_ =>
                0 as VALUE
            ) as ROW
        ) as GRID

    fillGrid(grid)

    return (
        <Container data-cy="grid-container">
            {
                array(grid.map((row, rowIndex) => (
                    <Row data-cy="grid-row-container">
                        {
                            array(row.map((value, colIndex) =>
                                <Block value={value}
                                    row={rowIndex}
                                    col={colIndex} />))
                        }
                    </Row>
                )))
            }
        </Container>
    )
}

export default Grid;
