import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import PlayerDash from './PlayerDash';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';

const finishedAnimatingSelector = createSelector(
  gameSelectors.isInitializedSelector,
  uiSelectors.isAnimatingSelector,
  (isInitialized, isAnimating) => isInitialized && !isAnimating
);

const mapStateToProps = (state, props) => ({
  showDash: finishedAnimatingSelector(state),
  total: gameSelectors.totalSelector(state),
  used: gameSelectors.checkersAvailSelector(state, props.playerId),
});

export default connect(mapStateToProps, null)(PlayerDash);
