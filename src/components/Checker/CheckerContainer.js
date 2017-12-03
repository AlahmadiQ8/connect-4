import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { domRectToObject } from '../../utils';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';

import Checker from './Checker';

class CheckerContainer extends Component {
  state = {
    initialPosition: {},
  };

  componentDidMount() {
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

const isColumnHovered = createSelector(
  gameSelectors.colIndexSelector,
  uiSelectors.columnsHoverStatusSelector,
  (colIndex, columnsHoverStatus) => columnsHoverStatus.get(colIndex)
);

const mapStateToProps = (state, props) => ({
  leftDashChecker: uiSelectors.leftDashCheckerSelector(state),
  rightDashChecker: uiSelectors.rightDashCheckerSelector(state),
  isInitialized: gameSelectors.isInitializedSelector(state),
  isColumnHovered: isColumnHovered(state, props),
});

export default connect(mapStateToProps, null)(CheckerContainer);
