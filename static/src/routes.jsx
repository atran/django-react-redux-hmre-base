import App from './app';

// Loading modules!
function loadRoute(cb) {
	window.scrollTo(0, 0);
	return module => cb(null, module.default);
}

export default {
	path: '/', // at index '/', the <Core /> component will be loaded
	component: App,
	indexRoute: { // but we also want our indexRoute to load <Home />
		getComponent(location, cb) {
			System.import('./containers/Home')
				.then(loadRoute(cb));
		},
	},
	childRoutes: [],
};
