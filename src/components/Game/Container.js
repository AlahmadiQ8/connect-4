import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as gameActions } from '../../redux/game';
import selectors from '../../redux/game-selectors';

import Game from './Presenter';

export default connect(
  selectors,
  dispatch => bindActionCreators(gameActions, dispatch)
)(Game);
