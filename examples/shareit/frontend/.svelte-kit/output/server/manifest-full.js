export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Blcvq-3_.js",app:"_app/immutable/entry/app.f7QgwZtR.js",imports:["_app/immutable/entry/start.Blcvq-3_.js","_app/immutable/chunks/ToBN3rU2.js","_app/immutable/chunks/Cx-O9e__.js","_app/immutable/chunks/Ccub5v1K.js","_app/immutable/entry/app.f7QgwZtR.js","_app/immutable/chunks/Cx-O9e__.js","_app/immutable/chunks/DNkSv5bp.js","_app/immutable/chunks/pcuE1vcW.js","_app/immutable/chunks/Ccub5v1K.js","_app/immutable/chunks/Dy7oa_Pi.js","_app/immutable/chunks/DwlYgJ1-.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
