import React, { FC } from 'react'

import { Container } from './styles'

import { VALUE } from 'typings'

interface BlockProps {
    col: number,
    row: number,
    value: VALUE
}

const Block: FC<BlockProps> = ({ row, col, value }) => {
    return (
        <Container data-cy={`block-${row}-${col}`}>
            {value}
        </Container>
    )
}

export default Block
