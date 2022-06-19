/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	distDir: 'build',
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};

		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['storage.googleapis.com'],
	},
};
