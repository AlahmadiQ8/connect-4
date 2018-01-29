import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import PlayerDash from './PlayerDash';
import * as gameSelectors from '../../redux/game-selectors';
import * as uiSelectors from '../../redux/ui-selectors';

const makeFinishedAnimatingSelector = () => createSelector(
  gameSelectors.isInitializedSelector,
  uiSelectors.isAnimatingSelector,
  (isInitialized, isAnimating) => isInitialized && !isAnimating
);

const mapStateToProps = (state, props) => ({
  showDash: makeFinishedAnimatingSelector()(state),
  total: gameSelectors.totalSelector(state),
  used: gameSelectors.makeCheckersAvailSelector()(state, props),
});

export default connect(mapStateToProps, null)(PlayerDash);
