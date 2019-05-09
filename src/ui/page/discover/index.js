import { connect } from 'react-redux';
import {
  doFetchRewardedContent,
  doRewardList,
  selectFeaturedUris,
  doFetchFeaturedUris,
  selectFetchingFeaturedUris,
} from 'lbryinc';
import { doUpdateSearchQuery } from 'lbry-redux';
import DiscoverPage from './view';

const select = state => ({
  featuredUris: selectFeaturedUris(state),
  fetchingFeaturedUris: selectFetchingFeaturedUris(state),
});

const perform = dispatch => ({
  fetchFeaturedUris: () => dispatch(doFetchFeaturedUris()),
  fetchRewardedContent: () => dispatch(doFetchRewardedContent()),
  fetchRewards: () => dispatch(doRewardList()),
  updateSearchQuery: query => dispatch(doUpdateSearchQuery(query)),
});

export default connect(
  select,
  perform
)(DiscoverPage);
