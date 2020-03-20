import React, { FC } from 'react'

import { Container } from './styles'

interface BlockProps {
    col: number,
    row: number
}

const Block: FC<BlockProps> = ({ row, col }) => {
    return (
        <Container data-cy="block">{row}-{col}</Container>
    )
}

export default Block
