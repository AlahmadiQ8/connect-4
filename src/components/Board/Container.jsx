import { connect } from 'react-redux';

import Board from './Presenter';
import { selectors } from '../../redux';

const mapStateToProps = selectors;

export default connect(mapStateToProps, null)(Board);
