import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect as connectRedux } from 'react-redux';
import { createSelector } from 'reselect';
import { DropTarget } from 'react-dnd';
import { List } from 'immutable';

import { actions as gameActions } from '../../redux/game';
import { actions as uiActions } from '../../redux/ui';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';
import { ItemTypes } from '../../dragAndDrop';
import BoardSquare from './BoardSquare';

const targetSpec = {
  drop(props) {
    props.actions.insertChecker();
    props.actions.setHoveredColumn(props.colIndex, false);
  },
};

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

class BoardSquareContainer extends Component {
  static propTypes = {
    colIndex: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
    columnsHoverStatus: PropTypes.instanceOf(List).isRequired,
    isColumnHovered: PropTypes.bool,
    actions: PropTypes.shape({
      setHoveredColumn: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    isColumnHovered: false,
  };

  componentWillReceiveProps(nextProps) {
    const { colIndex, actions: { setHoveredColumn } } = this.props;

    if (!this.props.isOver && nextProps.isOver && !this.props.isColumnHovered) {
      // dragged object entering target handler
      const prevHoveredIndex = this.props.columnsHoverStatus.findIndex(
        val => val === true
      );
      setHoveredColumn(prevHoveredIndex, false);
      setHoveredColumn(colIndex, true);
    }
  }

  render() {
    const {
      connectDropTarget,
      children,
      colIndex,
      isColumnHovered,
      ...rest
    } = this.props;

    return connectDropTarget(
      <div>
        <BoardSquare isColumnHovered={isColumnHovered} {...rest}>
          {children}
        </BoardSquare>
      </div>
    );
  }
}

const isColumnHoveredSelector = createSelector(
  gameSelectors.colIndexSelector,
  uiSelectors.columnsHoverStatusSelector,
  (colIndex, columnsHoverStatus) => columnsHoverStatus.get(colIndex)
);

const mapStateToProps = (state, props) => ({
  colIndex: gameSelectors.colIndexSelector(state, props),
  isColumnHovered: isColumnHoveredSelector(state, props),
  columnsHoverStatus: uiSelectors.columnsHoverStatusSelector(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
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
  connectRedux(mapStateToProps, null, mergeProps),
  DropTarget(ItemTypes.CHECKER, targetSpec, targetCollect)
)(BoardSquareContainer);
