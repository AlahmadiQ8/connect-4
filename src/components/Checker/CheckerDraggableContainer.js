import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

import { actions as uiActions } from '../../redux/ui';
import { ItemTypes } from '../../dragAndDrop';
import CheckerSvg from './CheckerSvg';

const sourceSpec = {
  beginDrag() {
    return {};
  },
};

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
});

class CheckerDraggableContainer extends Component {
  componentDidMount() {
    const { getRectDirection, actions } = this.props;
    actions.setDashCheckerRect(
      this.checkerRef.getBoundingClientRect(),
      getRectDirection
    );
  }

  render() {
    const { connectDragSource, isDragging, color } = this.props;
    return connectDragSource(
      <div>
        <CheckerSvg
          color={color}
          size={50}
          checkerRef={el => {
            this.checkerRef = el;
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setDashCheckerRect: uiActions.setDashCheckerRect,
    },
    dispatch
  ),
});

export default compose(
  DragSource(ItemTypes.CHECKER, sourceSpec, sourceCollect),
  connect(null, mapDispatchToProps)
)(CheckerDraggableContainer);
