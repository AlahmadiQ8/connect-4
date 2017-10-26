import { createSelector, createStructuredSelector } from 'reselect';

export const _isInitialized = state => state.get('rows') && state.get('cols');

export default createStructuredSelector({
  isInitialized: _isInitialized,
});
