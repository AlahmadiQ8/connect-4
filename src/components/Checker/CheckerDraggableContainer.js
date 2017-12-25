import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect as connectRedux } from 'react-redux';
import { DragSource } from 'react-dnd';

import * as gameSelectors from '../../redux/game-selectors';
import { actions as uiActions } from '../../redux/ui';
import { ItemTypes } from '../../dragAndDrop';
import CheckerSvg from './CheckerSvg';

const sourceSpec = {
  beginDrag() {
    return {};
  },

  canDrag(props) {
    return props.playerId === props.currentPlayerIndex && props.winner === null;
  },
};

const sourceCollect = connect => ({
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
  };

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

const mapStateToProps = state => ({
  currentPlayerIndex: gameSelectors.currentPlayerIndexSelector(state),
  winner: gameSelectors.winnerSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setDashCheckerRect: uiActions.setDashCheckerRect,
    },
    dispatch
  ),
});

export default compose(
  connectRedux(mapStateToProps, mapDispatchToProps),
  DragSource(ItemTypes.CHECKER, sourceSpec, sourceCollect)
)(CheckerDraggableContainer);
