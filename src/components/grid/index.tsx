import React, { FC, Children, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'

import { Container, Row } from 'components/grid/styles'
import Block from 'components/grid/block'
import { createGrid } from 'reducers'

const Grid: FC = () => {
    // huh?
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    const create = useCallback(() => dispatch(createGrid()), [dispatch])
    useEffect(() => { create() }, [create])

    return (
        <Container data-cy="grid-container">
            {
                Children.toArray([...Array(9)].map((row, rowIndex) => (
                    <Row data-cy="grid-row-container">
                        {
                            Children.toArray([...Array(9)].map((value, colIndex) =>
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
