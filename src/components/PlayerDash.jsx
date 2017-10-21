import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import * as styles from '../styles';
import Checker from './Checker';

console.log(styles.clearFix);

const DashRow = styled.div`
  ${styles.clearFix} margin-top: 10px;
  font-size: 1.2em;
  color: #2196f3;
  border-bottom: 1px solid #2196f3;
`;

const Float = styled.span`
  float: ${props => props.dir};
`;

const Container = styled.div`${
  styles.center}
  max-width: 175px;`;

const PlayerDash = ({ color, total, used }) => {
  return (
    <Container>
      <Checker color={color} />
      <div>
        <DashRow>
          <Float dir="left">Available Checkers</Float>
          <Float dir="right">{total - used}</Float>
        </DashRow>
        <DashRow>
          <Float dir="left">Used Checkers</Float>
          <Float dir="right">{used}</Float>
        </DashRow>
      </div>
    </Container>
  );
};

PlayerDash.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow']).isRequired,
  total: PropTypes.number,
  used: PropTypes.number,
};

export default PlayerDash;
