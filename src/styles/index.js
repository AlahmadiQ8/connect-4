import { css } from 'styled-components';

export const clearFix = css`
  &::after {
    display: block;
    clear: both;
    content: '';
  }
`;

export const center = css`
  text-align: center;
`;
