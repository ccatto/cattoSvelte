export async function load({ params }) {
    const siteLanguage = import.meta.env.VITE_WEBSITE_LANGUAGE_CODE;
    // console.log('PARAMS SLUG', params.slug);

    // const contentQuery = `filters[slug][$contains]=${params.slug}&locale=${siteLanguage}`;
    const contentQuery = `blog-articles`;

    const route = `${import.meta.env.VITE_CMS_STAGING_URL}/api/v2/${contentQuery}`;
    if (route.includes('icon')) {
        return {
            body: {}
        };
    }

    const authToken = import.meta.env.VITE_AUTH_TOKEN;

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${authToken}`);

    const content = await fetch(route, { headers }).then((res) => res.json());

    content.content = content.content || "<div class='mx-auto max-w-md text-center'>Coming soon</div>";

    return {
        pageContent: content
    };
}
