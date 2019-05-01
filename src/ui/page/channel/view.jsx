// @flow
import React, { useEffect, useState } from 'react';
import { parseURI } from 'lbry-redux';
import Page from 'component/page';
import SubscribeButton from 'component/subscribeButton';
import ShareButton from 'component/shareButton';
import classNames from 'classnames';
import { AnimatedTab, AnimatedTabs } from 'component/common/animated-tabs';
import { TabList, TabPanels, TabPanel } from '@reach/tabs';
import { withRouter } from 'react-router';
import { formatLbryUriForWeb } from 'util/uri';
import ChannelContent from 'component/channelContent';
import ChannelAbout from 'component/channelAbout';

type Props = {
  uri: string,
  title: ?string,
  cover: ?string,
  thumbnail: ?string,
  history: { push: string => void },
  match: { params: { attribute: ?string } },
};

function ChannelPage(props: Props) {
  const { uri, title, cover, thumbnail, history, match } = props;
  const { channelName, claimName, claimId } = parseURI(uri);
  const { params } = match;

  const tabIndex = params.attribute === 'about' ? 1 : 0;
  const onTabChange = newTabIndex => {
    let url = formatLbryUriForWeb(uri);
    if (newTabIndex !== 0) {
      url += '/about';
    }

    history.push(url + '/');
  };

  return (
    <Page notContained noPadding>
      <header className="channel__cover">
        {cover && <img className="channel__cover--custom" src={cover} />}
        <div className="channel__profile">
          <div className="channel__thumbnail">
            {thumbnail && <img className="channel__thumbnail--custom" src={thumbnail} />}
          </div>
          <div className="channel__info">
            <h1 className="channel__title">{title || channelName}</h1>
            <h2 className="channel__url">
              {claimName}#{claimId}
            </h2>
          </div>
        </div>
      </header>

      <div className="channel__wrapper">
        <div className="channel__actions">
          <ShareButton uri={uri} />
          <SubscribeButton uri={uri} />
        </div>

        <AnimatedTabs className="channel__content-wrapper" onChange={onTabChange} index={tabIndex}>
          <TabList className="channel__tabs">
            <AnimatedTab>Content</AnimatedTab>
            <AnimatedTab>About</AnimatedTab>
          </TabList>

          <TabPanels className="channel__content">
            <TabPanel>
              <ChannelContent uri={uri} />
            </TabPanel>
            <TabPanel>
              <ChannelAbout uri={uri} />
            </TabPanel>
          </TabPanels>
        </AnimatedTabs>
      </div>
    </Page>
  );
}

export default withRouter(ChannelPage);
