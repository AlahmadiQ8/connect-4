import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as gameActions } from '../../redux/game';
import * as gameSelectors from '../../redux/game-selectors';

import Game from './Presenter';

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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
