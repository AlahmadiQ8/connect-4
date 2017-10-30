import { connect } from 'react-redux';

import Board from './Presenter';
import selectors from '../../redux/game-selectors';

export default connect(selectors, null)(Board);
