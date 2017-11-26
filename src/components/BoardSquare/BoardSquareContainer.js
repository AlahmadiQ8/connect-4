import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect as connectRedux } from 'react-redux';
import { createSelector } from 'reselect';
import { DropTarget } from 'react-dnd';
import isNil from 'lodash/isNil';

import { actions as gameActions } from '../../redux/game';
import { actions as uiActions } from '../../redux/ui';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';
import { ItemTypes } from '../../dragAndDrop';
import BoardSquare from './BoardSquare';

const targetSpec = {
  drop(props) {
    // actions.setCurrentColumnHovered
    // actions.
    console.log(`dropped at ${props.index}`);
  },
};

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class BoardSquareContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func,
    children: PropTypes.element,
  };

  state = {
    shouldClearHover: false,
  };

  componentWillReceiveProps(nextProps) {
    const {
      colIndex,
      actions: { setCurrentHoveredColumn, setHoveredColumn },
    } = this.props;

    if (!this.props.isOver && nextProps.isOver && !this.props.isColumnHovered) {
      // dragged object entering target handler
      const prevHoveredIndex = this.props.columnsUiHoverStatus.findIndex(
        val => val === true
      );
      setHoveredColumn(prevHoveredIndex, null);
      setHoveredColumn(colIndex, true);
    }
  }

  render() {
    const {
      connectDropTarget,
      children,
      setCurrentHoveredColumn,
      colIndex,
      isColumnHovered,
      ...rest
    } = this.props;


    return connectDropTarget(
      <div>
        <BoardSquare isColumnHovered={isColumnHovered} {...rest}>{children}</BoardSquare>
      </div>
    );
  }
}

const isColumnHovered = createSelector(
  gameSelectors.colIndexSelector,
  uiSelectors.hoveredColumnsSelector,
  (colIndex, hoveredColumns) => hoveredColumns.get(colIndex)
);

const mapStateToProps = (state, props) => ({
  colIndex: gameSelectors.colIndexSelector(state, props),
  isColumnHovered: isColumnHovered(state, props),
  columnsUiHoverStatus: uiSelectors.hoveredColumnsSelector(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch, actions } = dispatchProps;
  const { colIndex } = stateProps;
  const { insertChecker } = gameActions;
  const { setCurrentHoveredColumn } = uiActions;

  return Object.assign({}, ownProps, stateProps, {
    actions: {
      insertChecker: () => dispatch(insertChecker(colIndex)),
      setHoveredColumn: (index, val) =>
        dispatch(setCurrentHoveredColumn(index, val)),
    },
  });
};

export default compose(
  DropTarget(ItemTypes.CHECKER, targetSpec, targetCollect),
  connectRedux(mapStateToProps, null, mergeProps)
)(BoardSquareContainer);
