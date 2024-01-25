import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import groupBy from 'lodash.groupby';
import 'dotenv/config';

export const getVehicleCategories = async (searchIndex) => {
	let hits = [];
	let makes = [];
	let models = [];
	await searchIndex
		.browseObjects({
			distinct: 1,
			query: '', // Empty query will match all records,
			attributesToRetrieve: ['condition', 'make', 'model'],
			batch: (batch) => {
				hits = hits.concat(batch);
			}
		})
		.then(() => hits)
		.catch((err) => {
			console.error('GET VEHICLE CATEGORIES ERROR', err);
		});

	const uniqueHits = sortBy(uniqBy(hits, 'model'), 'make').map((hit) => {
		hit.condition = hit.condition ? hit.condition.toLowerCase() : '';
		hit.slug = `/${hit.make.replace(/\s/g, '-')}/${hit.model.replace(/\s/g, '-')}`;
		return hit;
	});

	let vehicleCategories = groupBy(uniqueHits, (p) => p.condition);
	delete vehicleCategories.undefined;

	vehicleCategories.makes = [...new Set(uniqueHits.map((hit) => hit.make))];
	vehicleCategories.models = [...new Set(uniqueHits.map((hit) => ({ make: hit.make, model: hit.model })))];
	makes = vehicleCategories.makes;
	models = vehicleCategories.models;
	return { vehicleCategories, makes, models };
};
