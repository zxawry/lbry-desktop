import { connect } from 'react-redux';
import { doFetchClaimsByChannel } from 'redux/actions/content';
import { PAGE_SIZE } from 'constants/claim';
import {
  makeSelectClaimForUri,
  makeSelectClaimIsMine,
  makeSelectTitleForUri,
  makeSelectThumbnailForUri,
  makeSelectCoverForUri,
} from 'lbry-redux';
import ChannelPage from './view';

const select = (state, props) => ({
  // claim: makeSelectClaimForUri(props.uri)(state),
  title: makeSelectTitleForUri(props.uri)(state),
  thumbnail: makeSelectThumbnailForUri(props.uri)(state),
  cover: makeSelectCoverForUri(props.uri)(state),
  channelIsMine: makeSelectClaimIsMine(props.uri)(state),
});

const perform = dispatch => ({});

export default connect(
  select,
  perform
)(ChannelPage);
