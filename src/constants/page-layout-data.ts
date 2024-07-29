interface PageMetadata {
	[key: string]: {
		title: string;
	};
}

export const pageLayoutData: PageMetadata = {
	'/': {
		title: 'Dashboard',
	},
	'/users': {
		title: 'Users management',
	},
	'/posts': {
		title: 'Posts management',
	},
	'/logs': {
		title: 'Logs reports',
	},
};
