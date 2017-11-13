import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardSquare from './BoardSquare';
import { actions as gameActions } from '../../redux/game';
import * as gameSelectors from '../../redux/game-selectors';

const mapStateToProps = (state, props) => ({
  colIndex: gameSelectors.colIndexSelector(state, props),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      insertChecker: gameActions.insertChecker,
    },
    dispatch
  ),
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, ownProps, stateProps, {
    actions: {
      insertChecker: () =>
        dispatchProps.actions.insertChecker(stateProps.colIndex),
    },
  });

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  BoardSquare
);
