import React, { FC } from 'react'

import { Container, Row } from './styles'
import Block from './block'

import { FilledGrid } from 'utils/fill-grid'

const array = React.Children.toArray

const Grid: FC = () => {
    const grid = FilledGrid()

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
