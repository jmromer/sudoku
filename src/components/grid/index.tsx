import React, { FC, Children } from 'react'

import { Container, Row } from 'components/grid/styles'
import Block from 'components/grid/block'
import utils from 'utils'

const Grid: FC = () => {
    const grid = utils.sudoku.filled()

    return (
        <Container data-cy="grid-container">
            {
                Children.toArray(grid.map((row, rowIndex) => (
                    <Row data-cy="grid-row-container">
                        {
                            Children.toArray(row.map((value, colIndex) =>
                                <Block
                                    row={rowIndex}
                                    col={colIndex}
                                    value={value}
                                />))
                        }
                    </Row>
                )))
            }
        </Container>
    )
}
export default Grid
