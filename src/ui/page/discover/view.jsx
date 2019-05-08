// @flow
import React from 'react';
import Page from 'component/page';
import CategoryList from 'component/categoryList';
import FirstRun from 'component/firstRun';
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
    const { featuredUris, fetchingFeaturedUris } = this.props;
    const hasContent = typeof featuredUris === 'object' && Object.keys(featuredUris).length;
    const failedToLoad = !fetchingFeaturedUris && !hasContent;

    return (
      <Page notContained isLoading={!hasContent && fetchingFeaturedUris} className="main--no-padding">
        <FirstRun />
        <div className="home">
          <div className="h">
            <Form>
              <div className="big">
                <FormField type="text" className="in" placeholder="Search..." />
              </div>
              <div className="options">
                <div className="">
                  <h3>For</h3>
                  {[
                    {
                      option: SEARCH_OPTIONS.INCLUDE_FILES,
                      label: __('Files'),
                    },
                    {
                      option: SEARCH_OPTIONS.INCLUDE_FILES,
                      label: __('Downloads'),
                    },
                    {
                      option: SEARCH_OPTIONS.INCLUDE_CHANNELS,
                      label: __('Channels'),
                    },
                    {
                      option: SEARCH_OPTIONS.INCLUDE_FILES_AND_CHANNELS,
                      label: __('Everything'),
                    },
                  ].map(({ option, label }, index) => (
                    <div key={option}>
                      <FormField
                        defaultChecked={index === 2}
                        name={option}
                        type="radio"
                        blockWrap={false}
                        label={label}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3>File Type</h3>
                  {[
                    {
                      option: SEARCH_OPTIONS.MEDIA_VIDEO,
                      label: __('Videos'),
                    },
                    {
                      option: SEARCH_OPTIONS.MEDIA_AUDIO,
                      label: __('Audio'),
                    },
                    {
                      option: SEARCH_OPTIONS.MEDIA_IMAGE,
                      label: __('Images'),
                    },
                    {
                      option: SEARCH_OPTIONS.MEDIA_TEXT,
                      label: __('Text'),
                    },
                    {
                      option: SEARCH_OPTIONS.MEDIA_APPLICATION,
                      label: __('Other Files'),
                    },
                  ].map(({ option, label }) => (
                    <div>
                      <FormField
                        key={option}
                        name={option}
                        type="checkbox"
                        blockWrap={false}
                        label={label}
                        checked={true}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h3>Returned Results</h3>
                  <FormField
                    type="select"
                    name="result-count"
                    value={50}
                    blockWrap={false}
                    // label={__('Returned Results')}
                  >
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </FormField>

                  <h3>Publish Date</h3>
                  <FormField
                    type="select"
                    name="result-count"
                    value={'Last 24 hours'}
                    blockWrap={false}
                    // label={__('Returned Results')}
                  >
                    <option value={10}>Last 24 hours</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </FormField>
                </div>
                <div>
                  <h3 style={{ marginTop: 27 }}>Tags</h3>
                  <FormField placeholder="Some category" type="text" name="result-count" blockWrap={false} />
                  <div className="tags">
                    <ul>
                      <li className="chosen">Movies</li>
                      <li>Video Games</li>
                      <br />
                      <li>Music</li>
                      <li className="chosen">Free</li>
                    </ul>
                  </div>
                </div>
              </div>
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
