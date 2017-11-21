import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as gameSelectors from '../../redux/game-selectors';

import Checker from '../Checker';

const PlayerDash = ({ total, used, color, showDash }) => {
  const getRectDirection = color === 'yellow' ? 'left' : 'right';
  const floatStyle = dir => ({ float: dir });
  return (
    <div className="PlayerDash-Container">
      <Checker getRectDirection={getRectDirection} type="dash" color={showDash ? color : 'white'} />
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
  getRectDirection: PropTypes.string,
};

PlayerDash.defaultProps = {
  total: 0,
  used: 0,
  getRectDirection: '',
};

const mapStateToProps = (state, props) => ({
  total: gameSelectors.totalSelector(state),
  used: gameSelectors.checkersAvailSelector(state, props.playerId),
});

export default connect(mapStateToProps, null)(PlayerDash);
