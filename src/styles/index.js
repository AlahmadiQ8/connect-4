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

export const hwAcceleration = css`
    perspective: 1000px;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
`;

export const hide = css`
  display: none;
`;
