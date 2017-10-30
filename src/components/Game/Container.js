import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../redux/game';
import selectors from '../../redux/game-selectors';

import Game from './Presenter';

export default connect(
  selectors,
  dispatch => bindActionCreators(actions, dispatch)
)(Game);
