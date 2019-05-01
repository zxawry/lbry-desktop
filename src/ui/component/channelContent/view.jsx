// @flow
import React, { Fragment } from 'react';
import FileList from 'component/fileList';
import HiddenNsfwClaims from 'component/hiddenNsfwClaims';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Paginate from 'component/common/paginate';
import Spinner from 'component/spinner';

type Props = {
  uri: string,
  totalPages: number,
  fetching: boolean,
  params: { page: number },
  claimsInChannel: Array<StreamClaim>,
  channelIsMine: boolean,
  fetchClaims: (string, number) => void,
  history: { push: string => void },
  location: UrlLocation,
};

function ChannelContent(props: Props) {
  const {
    uri,
    fetching,
    claimsInChannel,
    totalPages,
    channelIsMine,
    fetchClaims,
    location,
    history,
  } = props;

  const hasContent = Boolean(claimsInChannel && claimsInChannel.length);

  return (
    <Fragment>
      {fetching && !hasContent && (
        <section className="main--empty">
          <Spinner delayed />
        </section>
      )}

      {!fetching && !hasContent && (
        <h2 className="empty">{__("This channel hasn't uploaded anything.")}</h2>
      )}

      {!channelIsMine && <HiddenNsfwClaims className="card__content help" uri={uri} />}

      {hasContent && (
        <Fragment>
          <FileList sortByHeight hideFilter fileInfos={claimsInChannel} />
        </Fragment>
      )}

      <Paginate
        onPageChange={page => fetchClaims(uri, page)}
        totalPages={totalPages}
        loading={fetching}
      />
    </Fragment>
  );
}

export default withRouter(ChannelContent);
