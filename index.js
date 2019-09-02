const alfy = require('alfy');
const algoliasearch = require('algoliasearch');
const { last } = require('lodash');

const client = algoliasearch('BH4D9OD16A', 'f854bb46d3de7eeb921a3b9173bd0d4c');
const index = client.initIndex('vue-router');

(async () => {
	const { hits } = await index.search({
		query: alfy.input,
		hitsPerPage: 5,
		facetFilters: ['lang:en-US']
	});

	const output = hits.map(hit => {
		const result = {
			title: hit.anchor,
			subtitle: hit.anchor,
			arg: hit.url,
			quicklookurl: hit.url
		};

		if (hit.hierarchy) {
			const hierarchies = Object.values(hit.hierarchy).filter(Boolean);

			result.title = last(hierarchies);
			result.subtitle = hierarchies.join(' > ');
		}

		return result;
	});

	alfy.output(output);
})();
