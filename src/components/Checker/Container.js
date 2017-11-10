import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { domRectToObject } from '../../utils';
import { actions as uiActions } from '../../redux/ui';
import { colsSelector, rowsSelector, isInitializedSelector } from '../../redux/game-selectors';
import { leftDashCheckerSelector, rightDashCheckerSelector } from '../../redux/ui-selectors';

import Checker from './Presenter';

class CheckerContainer extends Component {

  state = {
    initialPosition: {},
  }

  componentDidMount() {
    const { getRectDirection, gridIndex, setDashCheckerRect, saveSingleBoxPosition } = this.props;
    if (getRectDirection) {
      setDashCheckerRect(
        this.checkerRef.getBoundingClientRect(),
        getRectDirection
      );
    }
    this.setState({ 
      initialPosition: domRectToObject(this.checkerRef.getBoundingClientRect()), 
    })
    if (typeof gridIndex !== 'undefined') {
      saveSingleBoxPosition(this.checkerRef.getBoundingClientRect(), gridIndex);
    }
  }

  render() {
    return (
      <Checker
        {...this.props}
        initialPosition={this.state.initialPosition}
        checkerRef={el => {
          this.checkerRef = el;
        }}
      />
    );
  }
}

export default connect(
  state => ({
    leftDashChecker: leftDashCheckerSelector(state),
    rightDashChecker: rightDashCheckerSelector(state),
    isInitialized: isInitializedSelector(state),
  }),
  dispatch => bindActionCreators(uiActions, dispatch)
)(CheckerContainer);
