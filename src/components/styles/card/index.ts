import styled, { css } from 'styled-components'

export const Card = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border-radius: 15px;
    color: ${theme.colors.black};
    display: flex;
    flex-direction: column;
    flex: 1;
    line-height: 1;
    max-height: fit-content;
    padding: 15px;
  `}
`
