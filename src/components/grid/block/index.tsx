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
    value: VALUE
}

const Block: FC<BlockProps> = ({ row, col, value }) => {
    const state = useSelector<MainReducer, BlockState>(({ grid }) =>
        ({ value: grid ? grid[row][col] : 0 })
    )

    const dispatch = useDispatch<Dispatch<AnyAction>>()

    function handleClick() {
        dispatch(selectBlock([row, col] as COORD))
    }

    return (
        <Container
            onClick={handleClick}
            data-cy={`block-${row}-${col}`}>
            {state.value === 0 ? '' : state.value}
        </Container>
    )
}

export default Block
