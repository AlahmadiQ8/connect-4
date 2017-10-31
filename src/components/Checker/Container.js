import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as uiActions } from '../../redux/ui';
import { colsSelector, rowsSelector } from '../../redux/game-selectors';

import Checker from './Presenter';

export default connect(
  state => ({
    cols: colsSelector(state),
    rows: rowsSelector(state),
  }),
  dispatch => bindActionCreators(uiActions, dispatch)
)(Checker);
