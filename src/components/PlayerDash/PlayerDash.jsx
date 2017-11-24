import React from 'react';
import PropTypes from 'prop-types';

import { CheckerDraggable } from '../Checker';

const PlayerDash = ({ total, used, color, showDash }) => {
  const getRectDirection = color === 'yellow' ? 'left' : 'right';
  const floatStyle = dir => ({ float: dir });
  return (
    <div className="PlayerDash-Container">
      <CheckerDraggable
        getRectDirection={getRectDirection}
        color={showDash ? color : 'white'}
      />
      <div>
        <div className="PlayerDash-DashRow">
          <span style={floatStyle('left')}>Available Checkers</span>
          <span style={floatStyle('right')}>{total - used}</span>
        </div>
        <div className="PlayerDash-DashRow">
          <span style={floatStyle('left')}>Used Checkers</span>
          <span style={floatStyle('right')}>{used}</span>
        </div>
      </div>
    </div>
  );
};

PlayerDash.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow']).isRequired,
  total: PropTypes.number,
  used: PropTypes.number,
  showDash: PropTypes.bool,
};

PlayerDash.defaultProps = {
  total: 0,
  used: 0,
  showDash: true,
};

export default PlayerDash;
