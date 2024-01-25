/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    let siteConfiguration = event.locals.siteConfig;

    if (event.locals.siteConfig === undefined) {
        const siteConfigDomain = import.meta.env.VITE_DOMAIN_HOST;
        const { siteConfig } = await fetch(`${import.meta.env.VITE_CMS_V2_API}/v2/websites?domain=${siteConfigDomain}`).then((res) => res.json());
        siteConfiguration = siteConfig;
    }
    event.locals.siteConfig = siteConfiguration;
    
    const response = await resolve(event);

    return response;
}


export const getSession = async (event) => {
    let siteConfiguration = event.locals.siteConfig;
    console.log(`getSession`, event.locals.siteConfig)

    if (event.locals.siteConfig === undefined) {
        console.log('No site config found, getting it in get session function...', event.locals.siteConfig);
        const siteConfigDomain = import.meta.env.VITE_DOMAIN_HOST;
        const { siteConfig } = await fetch(`${import.meta.env.VITE_CMS_V2_API}/v2/websites?domain=${siteConfigDomain}`).then((res) => res.json());

        siteConfiguration = siteConfig;
    }
    console.log(siteConfiguration, '====================>STIE CONFIG')
    return (event.locals.siteConfig = { ...siteConfiguration });
};
