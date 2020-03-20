import React, { FC } from 'react'

interface GridCallback { (element: any, index: number): any }
const grid = (func: GridCallback) =>
    React.Children.toArray([...Array(9)].map(func))

const Grid: FC = () => {
    return (
        <div data-cy="grid-container">
            {
                grid((_, rowNum) => (
                    <div data-cy="grid-row-container">
                        {
                            grid((_, colNum) => (
                                <div data-cy="block">
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Grid;
