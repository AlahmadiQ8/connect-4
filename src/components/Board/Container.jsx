import { connect } from 'react-redux';

import Board from './Presenter';
import * as gameSelectors from '../../redux/game-selectors';

const mapStateToProps = state => ({
  isInitialized: gameSelectors.isInitializedSelector(state),
  grid: gameSelectors.gridSelector(state),
  rows: gameSelectors.rowsSelector(state),
  cols: gameSelectors.colsSelector(state),
});

export default connect(mapStateToProps, null)(Board);
