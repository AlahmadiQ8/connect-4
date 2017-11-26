import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../dragAndDrop';

import Game from './Game';

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
});

class GameAsDropTarget extends Component {

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
