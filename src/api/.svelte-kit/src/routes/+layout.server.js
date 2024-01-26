export async function load({ locals, ...stuff }) {
    const { siteConfig } = locals;

    if (!siteConfig) {
        debugger;
        return {
            status: 500,
            error: `No site config found for ${import.meta.env.VITE_DOMAIN_HOST}`
        };
    }

    // Add header navigation to stuff
    stuff.headerNavigation = siteConfig?.navigation?.header_navigation ?? [];

    // Add siteConfig to stuff
    stuff.siteConfig = siteConfig;

    // Extract websiteNavigation for convenience
    const websiteNavigation = siteConfig?.navigation?.header_navigation;

    try {
        // Serialize stuff object to ensure it's serializable
        const serializedStuff = JSON.stringify({ ...stuff, websiteNavigation });

        // If successful, parse it back to an object and return it
        return {
            status: 200,
            stuff: JSON.parse(serializedStuff)
        };
    } catch (error) {
        // Handle the error if stuff is not serializable
        console.error("Error serializing stuff: ", error);
        return {
            status: 500,
            error: "Internal server error"
        };
    }
}
