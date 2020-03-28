import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'

import { MainReducer, selectBlock } from 'reducers'
import { COORD, VALUE } from 'typings'

import { Container } from './styles'

interface BlockProps {
    col: number,
    row: number,
    value: VALUE
}

interface BlockState {
    value: VALUE,
    isActive: boolean
}

const Block: FC<BlockProps> = ({ row, col, value }) => {
    const state = useSelector<MainReducer, BlockState>(({ grid, selectedBlock }) => {
        let [selRow, selCol] = selectedBlock || []

        return {
            value: grid ? grid[row][col] : 0,
            isActive: (row === selRow && col === selCol)
        }
    })

    const dispatch = useDispatch<Dispatch<AnyAction>>()

    function handleClick() {
        if (state.isActive) { return }
        dispatch(selectBlock([row, col] as COORD))
    }

    return (
        <Container
            onClick={handleClick}
            isActive={state.isActive}
            data-cy={`block-${row}-${col}`}>
            {state.value === 0 ? '' : state.value}
        </Container>
    )
}

export default Block
