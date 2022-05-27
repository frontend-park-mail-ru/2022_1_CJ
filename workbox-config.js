module.exports = {
	mode: "production",
	globDirectory: "dist",
	globPatterns: ["**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest,map}"],
	swDest: "dist/sw.js",
	clientsClaim: true,
	skipWaiting: true,
	navigateFallback: "/index.html",
};
