// @flow
import React, { Fragment } from 'react';
import classNames from 'classnames';

type Props = {
  uri: string,
  claim: ChannelClaim,
};

function ChannelContent(props: Props) {
  const { uri, claim } = props;

  console.log({ claim });

  return (
    <Fragment>
      <section>
        <h2 className="empty">Nothing here yet</h2>
      </section>
    </Fragment>
  );
}

export default ChannelContent;
