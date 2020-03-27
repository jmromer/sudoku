import styled, { css } from 'styled-components'

interface ContainerProps {
    isActive?: boolean
}

export const Container = styled.div<ContainerProps>`
  ${({ isActive, theme }) => css`
    align-items: center;
    background-color: ${isActive ? theme.colors.blue : theme.colors.white};
    border: 1px solid ${theme.colors.black};
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
    font-weight: 400;
    font-size: 20px;
    height: auto;
    justify-content: center;
    transition: ${theme.transition};
    user-select: none;

    &:before {
      padding-top: 100%;
      content: '';
      float: left;
    }

    &:hover {
      background-color: ${theme.colors.lightBlue};
    }
  `}
`
