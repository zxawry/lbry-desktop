// @flow
import * as PAGES from 'constants/pages';
import * as ICONS from 'constants/icons';
import React from 'react';
import classnames from 'classnames';
import { normalizeURI, SEARCH_TYPES, isURIValid, buildURI } from 'lbry-redux';
import Icon from 'component/common/icon';
import { parseQueryParams } from 'util/query-params';
import Autocomplete from './internal/autocomplete';
import { withRouter } from 'react-router';
import { Form } from 'component/common/form';

const L_KEY_CODE = 76;
const ESC_KEY_CODE = 27;

type Props = {
  searchQuery: ?string,
  updateSearchQuery: string => void,
  onSearch: string => void,
  onSubmit: string => void,
  wunderbarValue: ?string,
  suggestions: Array<string>,
  doFocus: () => void,
  doBlur: () => void,
  focused: boolean,
  doShowSnackBar: string => void,
};

type State = {
  query: ?string,
};

class WunderBar extends React.PureComponent<Props, State> {
  constructor() {
    super();

    this.state = {
      query: '',
    };

    (this: any).handleSubmit = this.handleSubmit.bind(this);
    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'file':
        return ICONS.FILE;
      case 'channel':
        return ICONS.CHANNEL;
      default:
        return ICONS.SEARCH;
    }
  };

  handleKeyDown(event: SyntheticKeyboardEvent<*>) {
    const { ctrlKey, metaKey, keyCode } = event;
    const { doFocus, doBlur, focused } = this.props;

    if (this.input) {
      if (focused && keyCode === ESC_KEY_CODE) {
        this.input.blur();
        doBlur();
        return;
      }

      // @if TARGET='app'
      const shouldFocus =
        process.platform === 'darwin' ? keyCode === L_KEY_CODE && metaKey : keyCode === L_KEY_CODE && ctrlKey;

      if (shouldFocus) {
        this.input.focus();
        doFocus();
      }
      // @endif
    }
  }

  handleChange(e: SyntheticInputEvent<*>) {
    const { value } = e.target;
    const { updateSearchQuery } = this.props;
    // updateSearchQuery(value);
    this.setState({ query: e.target.value });
    // const { history } = this.props;
    // history.push(`?search=${e.target.value}`);
  }

  handleSubmit(value: string, suggestion?: { value: string, type: string }) {
    const { onSubmit, onSearch, doShowSnackBar, location } = this.props;

    // const { search } = location;
    // const urlParams = new URLSearchParams(search);
    // const urlQuery = urlParams.get('q');
    const urlQuery = this.state.query;
    const showSnackError = () => {
      doShowSnackBar('Invalid LBRY URL entered. Only A-Z, a-z, 0-9, and "-" allowed.');
    };

    // User selected a suggestion
    if (suggestion) {
      if (suggestion.type === 'search') {
        onSearch(urlQuery);
      } else if (isURIValid(urlQuery)) {
        const uri = normalizeURI(urlQuery);
        onSubmit(uri);
      } else {
        showSnackError();
      }

      return;
    }

    onSearch(urlQuery);

    // Currently no suggestion is highlighted. The user may have started
    // typing, then lost focus and came back later on the same page
    // try {
    //   if (isURIValid(urlQuery)) {
    //     const uri = normalizeURI(urlQuery);
    //     onSubmit(uri);
    //   } else {
    //     showSnackError();
    //   }
    // } catch (e) {
    //   onSearch(urlQuery);
    // }
  }

  input: ?HTMLInputElement;

  render() {
    const { suggestions, doFocus, doBlur, searchQuery, location } = this.props;

    const { search } = location;
    const urlParams = new URLSearchParams(search);
    const urlQuery = urlParams.get('q');

    return (
      location.pathname !== '/' && (
        <Form onSubmit={this.handleSubmit}>
          <div className="wunderbar">
            <Icon icon={ICONS.SEARCH} />
            <input
              value={this.state.query}
              onChange={this.handleChange}
              ref={el => (this.input = el)}
              className="wunderbar__input"
              placeholder="Enter a LBRY URL here or search for videos, music, games and more"
            />
          </div>
        </Form>
      )
    );
  }
}

export default withRouter(WunderBar);
/* <Autocomplete
  autoHighlight
  wrapperStyle={{ flex: 1, position: 'relative' }}
  value={urlQuery}
  items={suggestions}
  getItemValue={item => item.value}
  onChange={this.handleChange}
  onSelect={this.handleSubmit}
  inputProps={{
    onFocus: doFocus,
    onBlur: doBlur,
  }}
  renderInput={props => (
    <input
      {...props}
      ref={el => {
        props.ref(el);
        this.input = el;
      }}
      className="wunderbar__input"
      placeholder="Enter a LBRY URL here or search for videos, music, games and more"
    />
  )}
  renderItem={({ value, type }, isHighlighted) =>
    null && (
      <div
        key={value}
        className={classnames('wunderbar__suggestion', {
          'wunderbar__active-suggestion': isHighlighted,
        })}
      >
        <Icon icon={this.getSuggestionIcon(type)} />
        <span className="wunderbar__suggestion-label">{value}</span>
        {isHighlighted && (
          <span className="wunderbar__suggestion-label--action">
            {type === SEARCH_TYPES.SEARCH && __('Search')}
            {type === SEARCH_TYPES.CHANNEL && __('View channel')}
            {type === SEARCH_TYPES.FILE && __('View file')}
          </span>
        )}
      </div>
    )
  }
/> */
// </div>
