import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { MainReducer } from 'reducers'
import { VALUE } from 'typings'

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

    return (
        <Container data-cy={`block-${row}-${col}`}>
            {state.value === 0 ? '' : state.value}
        </Container>
    )
}

export default Block
