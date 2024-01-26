const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../../../src/routes/__error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/cms-data-load-error.svelte"),
	() => import("../../../src/routes/inventario/[...vehicles].svelte"),
	() => import("../../../src/routes/inventory/[...vehicles].svelte"),
	() => import("../../../src/routes/[content_category]/index.svelte"),
	() => import("../../../src/routes/[content_category]/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	,

	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/cms-data-load-error.svelte
	[/^\/cms-data-load-error\/?$/, [c[0], c[3]], [c[1]]],

	,

	// src/routes/inventario/[...vehicles].svelte
	[/^\/inventario(?:\/(.*))?\/?$/, [c[0], c[4]], [c[1]], (m) => ({ vehicles: d(m[1] || '')})],

	,

	,

	// src/routes/inventory/[...vehicles].svelte
	[/^\/inventory(?:\/(.*))?\/?$/, [c[0], c[5]], [c[1]], (m) => ({ vehicles: d(m[1] || '')})],

	,

	,

	,

	,

	// src/routes/[content_category]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ content_category: d(m[1])})],

	,

	// src/routes/[content_category]/[slug].svelte
	[/^\/([^/]+?)\/([^/]+?)\/?$/, [c[0], c[7]], [c[1]], (m) => ({ content_category: d(m[1]), slug: d(m[2])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];