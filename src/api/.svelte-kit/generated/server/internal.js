
import root from '../root.svelte';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_dir: "_app",
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\" class=\"h-full scroll-smooth bg-white antialiased\">\n\t<head>\n\t\t<!-- Meta Pixel Code -->\n\n\t\t<script>\n\t\t\t// (function (W, i, s, e, P, o, p) {\n\t\t\t// \tW['WisePopsObject'] = P;\n\t\t\t// \tW[P] = W[P] || function () {\n\t\t\t// \t(W[P].q = W[P].q || []).push(arguments);\n\t\t\t// \t};\n\t\t\t// \tW[P].l = 1 * new Date();\n\t\t\t// \to = i.createElement(s);\n\t\t\t// \tp = i.getElementsByTagName(s)[0];\n\t\t\t// \to.defer = 1;\n\t\t\t// \to.src = e;\n\t\t\t// \tp.parentNode.insertBefore(o, p);\n\t\t\t// })(window, document, 'script', '//loader.wisepops.com/get-loader.js?v=1&site=CQKyRKKsyB', 'wisepops');\n\n\t\t\t!(function (f, b, e, v, n, t, s) {\n\t\t\t\tif (f.fbq) return;\n\t\t\t\tn = f.fbq = function () {\n\t\t\t\t\tn.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);\n\t\t\t\t};\n\t\t\t\tif (!f._fbq) f._fbq = n;\n\t\t\t\tn.push = n;\n\t\t\t\tn.loaded = !0;\n\t\t\t\tn.version = '2.0';\n\t\t\t\tn.queue = [];\n\t\t\t\tt = b.createElement(e);\n\t\t\t\tt.async = !0;\n\t\t\t\tt.src = v;\n\t\t\t\ts = b.getElementsByTagName(e)[0];\n\t\t\t\ts.parentNode.insertBefore(t, s);\n\t\t\t})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');\n\t\t\tfbq('init', '607754367853297');\n\t\t\tfbq('track', 'PageView');\n\t\t</script>\n\t\t<noscript><img height=\"1\" width=\"1\" style=\"display: none\" src=\"https://www.facebook.com/tr?id=607754367853297&ev=PageView&noscript=1\" /></noscript>\n\t\t<!-- End Meta Pixel Code -->\n\t</head>\n\t<meta charset=\"utf-8\" />\n\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1 \" />\n\t\n\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css\" integrity=\"sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==\" crossorigin=\"anonymous\" referrerpolicy=\"no-referrer\" />\n\n\t<link rel=\"icon\" href=\"https://res.cloudinary.com/bdaspanish1/image/upload/c_thumb,g_face,w_35/v1647192105/branding_marketing/365CarShopLogo-no-bg_apzfmd.png\" />\n\n\t" + head + "\n\n\t<body class=\"flex h-full flex-col\">\n\t\t<div id=\"svelte\">" + body + "</div>\n\n\t\t<script data-cfasync=\"false\">\n\t\t\t(function (w, i, s, e) {\n\t\t\t\twindow[w] =\n\t\t\t\t\twindow[w] ||\n\t\t\t\t\tfunction () {\n\t\t\t\t\t\t(window[w].q = window[w].q || []).push(arguments);\n\t\t\t\t\t};\n\t\t\t\twindow[w].l = Date.now();\n\t\t\t\ts = document.createElement('script');\n\t\t\t\te = document.getElementsByTagName('script')[0];\n\t\t\t\ts.defer = 1;\n\t\t\t\ts.src = i;\n\t\t\t\te.parentNode.insertBefore(s, e);\n\t\t\t})('wisepops', 'https://wisepops.net/loader.js?v=2&h=Xwi4ztkziU');\n\t\t</script>\n\n\t\t<!-- <script data-cfasync=\"false\">(function(w,i,s,e){window[w]=window[w]||function(){(window[w].q=window[w].q||[]).push(arguments)};window[w].l=Date.now();s=document.createElement('script');e=document.getElementsByTagName('script')[0];s.defer=1;s.src=i;e.parentNode.insertBefore(s, e)})('wisepops', 'https://wisepops.net/loader.js?v=2&h=ySBfCV8XdC');</script> -->\n\n\t\t<!-- <script data-cfasync=\"false\">(function(w,i,s,e){window[w]=window[w]||function(){(window[w].q=window[w].q||[]).push(arguments)};window[w].l=Date.now();s=document.createElement('script');e=document.getElementsByTagName('script')[0];s.defer=1;s.src=i;e.parentNode.insertBefore(s, e)})('wisepops', 'https://wisepops.net/loader.js?v=2&h=ks7FTLT2fL');</script> -->\n\n\t\t<!-- <script data-cfasync=\"false\">\n\t\t\t(function(W,i,s,e,P,o,p){\n\t\t\t\tW['WisePopsObject']=P;\n\t\t\t\tW[P]=W[P]||function(){\n\t\t\t\t\t(W[P].q=W[P].q||[]).push(arguments)\n\t\t\t\t};\n\t\t\t\tW[P].l=1*new Date();\n\t\t\t\to=i.createElement(s);\n\t\t\t\tp=i.getElementsByTagName(s)[0];\n\t\t\t\to.defer=1;\n\t\t\t\to.src=e;\n\t\t\t\tp.parentNode.insertBefore(o,p);\n\t\t\t})(window,document,'script','//loader.wisepops.com/get-loader.js?v=1&site=CQKyRKKsyB','wisepops');\n\t\t</script> -->\n\t</body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "nmq33y"
};

export async function get_hooks() {
	return {
		...(await import("../../../src/hooks.server.js")),
		...(await import("../../../src/hooks.js")),
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };