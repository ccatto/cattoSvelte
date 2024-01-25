export async function get({ params }) {
	const siteLanguage = import.meta.env.VITE_WEBSITE_LANGUAGE_CODE;

	const content = await fetch(`${import.meta.env.VITE_CMS_URL}/contents/slug/${params.slug}/${siteLanguage}`).then((res) => res.json());

	return {
		body: {
			pageContent: content
		}
	};
}
