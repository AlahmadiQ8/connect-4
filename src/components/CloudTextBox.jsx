import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import * as styles from '../styles';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Svg = styled.svg`
  cursor: default;
  animation: ${pulse} 1s infinite alternate linear;
`;

const Container = styled.div`
  ${styles.center}
  max-width: 200px;
  font-size: 18px;
`;

const Text = styled.div`
  margin-top: 15px;
  color: #f8bbd0;
`;

const CloudTextBox = props => {
  return (
    <Container>
      <Svg
        width="155"
        height="103"
        viewBox="0 0 155 103"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fillRule="evenodd">
          <text
            fontFamily="Boogaloo-Regular, Boogaloo"
            fontSize="37"
            fill="#F48FB1"
          >
            <tspan x="18" y="65">
              Your Turn
            </tspan>
          </text>
          <path
            d="M50.323 18.042C55.936 8.454 66.453 2 78.5 2c12.043 0 22.557 6.45 28.171 16.033A32.798 32.798 0 0 1 120.5 15c17.95 0 32.5 14.327 32.5 32 0 17.673-14.55 32-32.5 32-.372 0-.743-.006-1.112-.018C115.128 91.767 102.909 101 88.5 101c-7.543 0-14.485-2.53-20-6.775C62.985 98.47 56.043 101 48.5 101c-16.77 0-30.572-12.505-32.315-28.561C7.621 66.676 2 56.984 2 46c0-17.673 14.55-32 32.5-32 5.744 0 11.14 1.467 15.823 4.042z"
            stroke="#F8BBD0"
            strokeWidth="3"
          />
        </g>
      </Svg>
      <Text>
        Drag and drop a checker<br />to the board
      </Text>
    </Container>
  );
};

export default CloudTextBox;
