import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { doToggleEnhancedLayout } from 'redux/actions/app';
import { selectUser } from 'lbryinc';
import { selectThemePath } from 'redux/selectors/settings';
import { selectEnhancedLayout } from 'redux/selectors/app';
import App from './view';

const select = state => ({
  theme: selectThemePath(state),
});

export default hot(connect(select)(App));
