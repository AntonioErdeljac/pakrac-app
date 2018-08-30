import config from './config';
import paths from './paths';

const initialRoute = paths.client.Home;

export default config;

export { default as actions } from './actions';
export { default as paths } from './paths';

export { initialRoute };
