import React, { FC } from 'react'

const Grid: FC = () => {
    return (
        <div data-cy="grid-container">
            {[...Array(9)].map((_, rowNum) => (
                <div data-cy="grid-row-container">
                    {[...Array(9)].map((_, colNum) => (
                        <div data-cy="block">
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Grid;
