// @flow
import React from 'react';
import Page from 'component/page';
import CategoryList from 'component/categoryList';
import FirstRun from 'component/firstRun';
import Icon from 'component/common/icon';
import { Form, FormField } from 'component/common/form';
import SearchOptions from 'component/searchOptions';
import { SEARCH_OPTIONS } from 'lbry-redux';

type Props = {
  fetchFeaturedUris: () => void,
  fetchRewardedContent: () => void,
  fetchRewards: () => void,
  fetchingFeaturedUris: boolean,
  featuredUris: {},
};

class DiscoverPage extends React.PureComponent<Props> {
  constructor() {
    super();
    this.continousFetch = undefined;

    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    const { fetchFeaturedUris, fetchRewardedContent, fetchRewards } = this.props;
    fetchFeaturedUris();
    fetchRewardedContent();

    this.continousFetch = setInterval(() => {
      fetchFeaturedUris();
      fetchRewardedContent();
      fetchRewards();
    }, 1000 * 60 * 60);
  }

  componentWillUnmount() {
    this.clearContinuousFetch();
  }

  getCategoryLinkPartByCategory(category: string) {
    const channelName = category.substr(category.indexOf('@'));
    if (!channelName.includes('#')) {
      return null;
    }
    return channelName;
  }

  trimClaimIdFromCategory(category: string) {
    return category.split('#')[0];
  }

  continousFetch: ?IntervalID;

  clearContinuousFetch() {
    if (this.continousFetch) {
      clearInterval(this.continousFetch);
      this.continousFetch = null;
    }
  }

  render() {
    const { featuredUris, fetchingFeaturedUris, history, doUpdateSearchQuery } = this.props;
    const hasContent = typeof featuredUris === 'object' && Object.keys(featuredUris).length;
    const failedToLoad = !fetchingFeaturedUris && !hasContent;

    return (
      <Page notContained isLoading={!hasContent && fetchingFeaturedUris} className="main--no-padding">
        {!IS_WEB && <FirstRun />}
        <div className="home">
          <div className="search-wrapper">
            <Form
              onSubmit={() => {
                history.push({ pathname: `/$/search`, search: `?q=${encodeURIComponent(this.state.query)}` });
              }}
            >
              <div className="big">
                <Icon icon="Search" size={48} />
                <FormField
                  autoFocus
                  value={this.state.query}
                  onChange={e => {
                    this.setState({ query: e.target.value });
                  }}
                  type="text"
                  className="in"
                  placeholder="Search..."
                />
              </div>
              <SearchOptions slim />
            </Form>
          </div>
        </div>
        {hasContent &&
          Object.keys(featuredUris).map(category => (
            <CategoryList
              lazyLoad
              key={category}
              category={this.trimClaimIdFromCategory(category)}
              uris={featuredUris[category]}
              categoryLink={this.getCategoryLinkPartByCategory(category)}
            />
          ))}
        {failedToLoad && <div className="empty">{__('Failed to load landing content.')}</div>}
      </Page>
    );
  }
}

export default DiscoverPage;
