/** @type {import('@sveltejs/kit').RequestHandler} */
export const prerender = true;

export async function load(context) {
    try {
        const siteConfigLanguage = context.locals?.siteConfig?.language_code || import.meta.env.VITE_WEBSITE_LANGUAGE_CODE;

        const contentQuery = `filters[slug][$contains]=home&locale=${siteConfigLanguage}`;
        const content = await fetch(`${import.meta.env.VITE_CMS_V2_API}/v2/website-contents?${contentQuery}`).then((res) => res.json());
        const components = content?.components;
        const metaData = content?.seo;

        return {
            body: {
                components: components,
                metaData: metaData
            }
        };
    } catch (err) {
        return {
            status: 400,
            body: {
                error: err.message
            }
        };
    }
}
