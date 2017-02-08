if (process.env.NODE_ENV === 'production') {
	module.exports = require('./Root.prod.jsx'); // eslint-disable-line global-require
} else {
	module.exports = require('./Root.dev.jsx'); // eslint-disable-line global-require
}
