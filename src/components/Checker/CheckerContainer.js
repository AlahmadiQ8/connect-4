import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { domRectToObject } from '../../utils';
import { actions as uiActions } from '../../redux/ui';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';

import Checker from './Checker';

class CheckerContainer extends Component {
  state = {
    initialPosition: {},
  };

  componentDidMount() {
    const { gridIndex, actions } = this.props;
    this.setState({
      initialPosition: domRectToObject(this.checkerRef.getBoundingClientRect()),
    });
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

const mapStateToProps = (state, props) => ({
  leftDashChecker: uiSelectors.leftDashCheckerSelector(state),
  rightDashChecker: uiSelectors.rightDashCheckerSelector(state),
  isInitialized: gameSelectors.isInitializedSelector(state),
});

export default connect(mapStateToProps, null)(
  CheckerContainer
);
