import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../redux';
import selectors from '../../redux/selectors';

import Game from './Presenter';

export default connect(
  selectors,
  dispatch => bindActionCreators(actions, dispatch)
)(Game);
