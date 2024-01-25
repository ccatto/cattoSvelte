import { readable, writable } from 'svelte/store';

export const homepageCtas = readable([
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1647231675/branding_marketing/cta-cars/coupes_lxhuy9'
			}
		],

		link_text: 'coupes',
		link_text_es: 'cupé'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1647231675/branding_marketing/cta-cars/luxury_huatia'
			}
		],

		link_text: 'luxury',
		link_text_es: 'lujo'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1647231526/branding_marketing/cta-cars/sedan_rqxr25'
			}
		],

		link_text: 'Sedans',
		link_text_es: 'sedán'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/c_scale,f_auto,w_436/v1647232381/branding_marketing/cta-cars/minivan_dyyzy0'
			}
		],

		link_text: 'Minivans',
		link_text_es: 'furgoneta'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1647232054/branding_marketing/cta-cars/sports_gcktvz.jpg'
			}
		],

		link_text: 'Sports',
		link_text_es: 'coche deportivo'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto,c_scale,w_408/v1647231932/branding_marketing/cta-cars/suv_himchf'
			}
		],

		link_text: 'SUVs',
		link_text_es: 'utilitario deportivo'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1647232139/branding_marketing/cta-cars/wagons_k3zpcv'
			}
		],

		link_text: 'Wagons',
		link_text_es: 'camioneta'
	},
	{
		image: [
			{
				url: 'https://res.cloudinary.com/bdaspanish1/image/upload/f_auto,q_auto/v1647232250/branding_marketing/cta-cars/truck_yea1h7'
			}
		],

		link_text: 'Trucks',
		link_text_es: 'camiones'
	}
]);

export const vehicleMakeSelector = writable({
	name: 'Make',
	value: '',
	default: 'All Makes',
	options: []
});
export const vehicleModelSelector = writable({
	name: 'Model',
	value: '',
	default: 'All Models',
	options: []
});

export const siteConfig = {};
