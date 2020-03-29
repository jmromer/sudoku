import React, { FC, Children, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction, Dispatch } from 'redux'

import useMouseTrap from 'react-hook-mousetrap'

import Block from 'components/grid/block'
import { Container, Row } from 'components/grid/styles'

import { createGrid, MainReducer, selectBlock } from 'reducers'
import { COORD } from 'typings'
import utils from 'utils'

interface GridState {
    selectedBlock?: COORD
}

const Grid: FC = () => {
    const dispatch = useDispatch<Dispatch<AnyAction>>()
    const create = useCallback(() => dispatch(createGrid()), [dispatch])
    useEffect(() => { create() }, [create])

    const state = useSelector<MainReducer, GridState>(state => state)
    useMouseTrap(['up', 'k'], () => {
        if (!state.selectedBlock) { return }
        const target = utils.sudoku.move('up', state.selectedBlock)
        dispatch(selectBlock(target))
    })

    useMouseTrap(['down', 'j'], () => {
        if (!state.selectedBlock) { return }
        const target = utils.sudoku.move('down', state.selectedBlock)
        dispatch(selectBlock(target))
    })

    useMouseTrap(['left', 'h'], () => {
        if (!state.selectedBlock) { return }
        const target = utils.sudoku.move('left', state.selectedBlock)
        dispatch(selectBlock(target))
    })

    useMouseTrap(['right', 'l'], () => {
        if (!state.selectedBlock) { return }
        const target = utils.sudoku.move('right', state.selectedBlock)
        dispatch(selectBlock(target))
    })

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
