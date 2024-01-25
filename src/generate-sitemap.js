import * as dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import fg from 'fast-glob';
import { create } from 'xmlbuilder2';
const baseUrl = `https://${process.env.VITE_DOMAIN_HOST || 'localhost:3000'}`;

const getUrl = (url) => {
	const trimmed = url.slice(6).replace('index.html', '').replace('prerendered/', '').replace('%20', '-').replace('%20', '-').replace('.html', '');

	return `${baseUrl}/${trimmed}`;
};

async function createSitemap() {
	const sitemap = create({ version: '1.0' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
	});

	const pages = await fg(['build/**/*.html']);
	const filteredPages = pages.filter((page) => !page.includes('icon')).map((page) => page.replace(/[ ]/g, '-'));

	filteredPages.forEach((page) => {
		const url = sitemap.ele('url');
		url.ele('loc').txt(getUrl(page));
		url.ele('changefreq').txt('weekly');
	});

	const xml = sitemap.end({ prettyPrint: true });

	fs.writeFileSync('static/sitemap.xml', xml);
}

createSitemap();
