import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { actions as gameActions } from '../../redux/game';
import * as gameSelectors from '../../redux/game-selectors';

import Game from './Game';

const mapStateToProps = state => ({
  rows: gameSelectors.rowsSelector(state),
  cols: gameSelectors.colsSelector(state),
  isInitialized: gameSelectors.isInitializedSelector(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      initializeBoard: gameActions.initializeBoard,
    },
    dispatch
  ),
});

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Game);
