import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Board from './Board';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';
import { actions as uiActions } from '../../redux/ui';
import { shuffleArray } from '../../utils';

const randomFilledGrid = (rows, cols) => {
  const grid = [
    ...Array(rows * cols / 2).fill(0),
    ...Array(rows * cols / 2).fill(1),
  ];
  shuffleArray(grid);
  return grid;
};

class BoardContainer extends Component {
  static propTypes = {
    isInitialized: PropTypes.bool.isRequired,
    grid: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.array]).isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    isAnimating: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      startAnimating: PropTypes.func.isRequired,
      animatingComplete: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    curGrid: randomFilledGrid(this.props.rows, this.props.cols),
  };

  componentWillReceiveProps(nextProps) {
    const { isInitialized, actions } = this.props;
    if (!isInitialized && nextProps.isInitialized) {
      actions.startAnimating();

      // since react-motion is not time based, we hard code a 1 second delay to
      // indicate trigger ANIMATE_COMPLETE action.
      setTimeout(() => {
        actions.animatingComplete();
      }, 1000);
    }

    const didStopAnimating = this.props.isAnimating && !nextProps.isAnimating;
    const noLongerAnimating =
      !this.props.isAnimating &&
      !nextProps.isAnimating &&
      this.props.isInitialized;

    if (didStopAnimating || noLongerAnimating) {
      this.setState({ curGrid: nextProps.grid });
    }
  }

  render() {
    return <Board {...this.props} grid={this.state.curGrid} />;
  }
}

const mapStateToProps = state => ({
  isInitialized: gameSelectors.isInitializedSelector(state),
  grid: gameSelectors.gridSelector(state),
  rows: gameSelectors.rowsSelector(state),
  cols: gameSelectors.colsSelector(state),
  isAnimating: uiSelectors.isAnimatingSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      startAnimating: uiActions.startAnimating,
      animatingComplete: uiActions.animatingComplete,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
