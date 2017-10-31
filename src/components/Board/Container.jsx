import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Board from './Presenter';
import selectors from '../../redux/game-selectors';
import { actions } from '../../redux/ui';

export default connect(selectors, dispatch =>
  bindActionCreators(actions, dispatch)
)(Board);
