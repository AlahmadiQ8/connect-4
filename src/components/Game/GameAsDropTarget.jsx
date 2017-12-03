import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../dragAndDrop';

import Game from './Game';

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
});

class GameAsDropTarget extends Component {
  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      clearHoveredColumns: PropTypes.func.isRequired,
    }).isRequired,
    cols: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      this.props.actions.clearHoveredColumns(this.props.cols);
    }
  }

  render() {
    const { connectDropTarget, ...rest } = this.props;
    return connectDropTarget(
      <div>
        <Game {...rest} />
      </div>
    );
  }
}

export default DropTarget(ItemTypes.CHECKER, {}, targetCollect)(
  GameAsDropTarget
);
