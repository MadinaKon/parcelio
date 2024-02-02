import styled, { css } from "styled-components";

export const StyledLink = styled.a`
  margin-bottom: 20px;
  background-color: #1976d2;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;

  ${({ justifySelf }) =>
    justifySelf &&
    css`
      justify-self: ${justifySelf};
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      text-align: center;
      background-color: white;
      border: 3px solid lightsalmon;
    `}
`;
