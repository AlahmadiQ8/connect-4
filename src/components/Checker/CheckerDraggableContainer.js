import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect as connectRedux } from 'react-redux';
import { DragSource } from 'react-dnd';

import { actions as uiActions } from '../../redux/ui';
import { ItemTypes } from '../../dragAndDrop';
import CheckerSvg from './CheckerSvg';

const sourceSpec = {
  beginDrag() {
    return {};
  },
};

const sourceCollect = (connect) => ({
  connectDragSource: connect.dragSource(),
});

class CheckerDraggableContainer extends Component {

  static propTypes = {
    getRectDirection: PropTypes.oneOf(['left', 'right']).isRequired,
    actions: PropTypes.shape({
      setDashCheckerRect: PropTypes.func.isRequired,
    }).isRequired,
    connectDragSource: PropTypes.PropTypes.func.isRequired,
    // isDragging: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const { getRectDirection, actions } = this.props;
    actions.setDashCheckerRect(
      this.checkerRef.getBoundingClientRect(),
      getRectDirection
    );
  }

  render() {
    const { connectDragSource, color } = this.props;
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
  connectRedux(null, mapDispatchToProps)
)(CheckerDraggableContainer);
