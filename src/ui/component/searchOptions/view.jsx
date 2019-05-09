// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import { SEARCH_OPTIONS } from 'lbry-redux';
import { Form, FormField } from 'component/common/form';
import posed from 'react-pose';
import Button from 'component/button';

const ExpandableOptions = posed.div({
  hide: { height: 0, opacity: 0 },
  show: { height: 300, opacity: 1 },
});

type Props = {
  setSearchOption: (string, boolean | string | number) => void,
  options: {},
  expanded: boolean,
  toggleSearchExpanded: () => void,
  query: string,
  onFeedbackPositive: string => void,
  onFeedbackNegative: string => void,
  slim?: boolean,
};

const SearchOptions = (props: Props) => {
  const {
    options,
    setSearchOption,
    expanded,
    toggleSearchExpanded,
    query,
    onFeedbackPositive,
    onFeedbackNegative,
    slim,
  } = props;
  const resultCount = options[SEARCH_OPTIONS.RESULT_COUNT];

  const Wrapper = ({ children }) =>
    console.log(children) || slim ? (
      children
    ) : (
      <ExpandableOptions pose={expanded ? 'show' : 'hide'}>{children}</ExpandableOptions>
    );

  return (
    <div className="search__options-wrapper">
      {!slim && (
        <div className="card--space-between">
          <Button
            button="alt"
            label={__('FILTER')}
            iconRight={expanded ? ICONS.UP : ICONS.DOWN}
            onClick={toggleSearchExpanded}
          />

          <div className="media__action-group">
            <span>{__('Find what you were looking for?')}</span>
            <Button button="alt" description={__('Yes')} onClick={() => onFeedbackPositive(query)} icon={ICONS.YES} />
            <Button button="alt" description={__('No')} onClick={() => onFeedbackNegative(query)} icon={ICONS.NO} />
          </div>
        </div>
      )}
      <Wrapper>
        {(expanded || slim) && (
          <div className="card__content search__options">
            <fieldset>
              <legend className="search__legend--1">{__('Search For')}</legend>
              {[
                {
                  option: SEARCH_OPTIONS.INCLUDE_FILES,
                  label: __('Files'),
                },
                {
                  option: SEARCH_OPTIONS.INCLUDE_CHANNELS,
                  label: __('Channels'),
                },
                {
                  option: SEARCH_OPTIONS.INCLUDE_FILES_AND_CHANNELS,
                  label: __('Everything'),
                },
              ].map(({ option, label }) => (
                <FormField
                  key={option}
                  name={option}
                  type="radio"
                  blockWrap={false}
                  label={label}
                  checked={options[SEARCH_OPTIONS.CLAIM_TYPE] === option}
                  onChange={() => setSearchOption(SEARCH_OPTIONS.CLAIM_TYPE, option)}
                />
              ))}
            </fieldset>

            <fieldset>
              <legend className="search__legend--2">{__('File Types')}</legend>
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
                <FormField
                  key={option}
                  name={option}
                  type="checkbox"
                  blockWrap={false}
                  disabled={options[SEARCH_OPTIONS.CLAIM_TYPE] === SEARCH_OPTIONS.INCLUDE_CHANNELS}
                  label={label}
                  checked={options[option]}
                  onChange={() => setSearchOption(option, !options[option])}
                />
              ))}
            </fieldset>

            {!slim && (
              <Form>
                <fieldset>
                  <legend className="search__legend--3">{__('Other Options')}</legend>
                  <FormField
                    type="select"
                    name="result-count"
                    value={resultCount}
                    onChange={e => setSearchOption(SEARCH_OPTIONS.RESULT_COUNT, e.target.value)}
                    blockWrap={false}
                    label={__('Returned Results')}
                  >
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </FormField>
                </fieldset>
              </Form>
            )}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default SearchOptions;
