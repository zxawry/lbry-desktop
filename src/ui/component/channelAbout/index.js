import { connect } from 'react-redux';
import { makeSelectClaimForUri } from 'lbry-redux';
import ChannelAbout from './view';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
});

const perform = dispatch => ({});

export default connect(
  select,
  perform
)(ChannelAbout);
