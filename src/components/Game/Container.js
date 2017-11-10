import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as gameActions } from '../../redux/game';
import { actions as uiActions } from '../../redux/ui';
import selectors from '../../redux/game-selectors';

import Game from './Presenter';

class GameContainer extends Component {
  componentDidMount() {
    const { rows, cols } = this.props;
    // this.props.initializeUiGrid(rows, cols);
  }

  render() {
    return (
      <Game {...this.props} />
    );
  }
}

export default connect(
  selectors,
  dispatch => bindActionCreators({ ...gameActions, ...uiActions }, dispatch)
)(GameContainer);

