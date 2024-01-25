export async function load({ params }) {
    const siteLanguage = import.meta.env.VITE_WEBSITE_LANGUAGE_CODE;
    console.log('PARAMS SLUG', params.slug);

    const contentQuery = `filters[slug][$contains]=${params.slug}&locale=${siteLanguage}`;
    const route = `https://staging.cms.v2.365automotivemarketing.com/content-manager/collection-types/api::blog-article.blog-article?page=1&pageSize=10&sort=Title:ASC`;

    // const route = `${import.meta.env.VITE_CMS_V2_API}/v2/website-contents/?${contentQuery}`;
    if (route.includes('icon')) {
        return {
            body: {}
        };
    }

    const content = await fetch(route).then((res) => res.json());
    content.content = content.content || "<div class='mx-auto max-w-md text-center'>Coming soon</div>";
    return {
        body: {
            pageContent: content
        }
    };
}
