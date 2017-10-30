import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as uiActions } from '../../redux/ui';

import Checker from './Presenter';

export default connect(
  null,
  dispatch => bindActionCreators(uiActions, dispatch)
)(Checker);
