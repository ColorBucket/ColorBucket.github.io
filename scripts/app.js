requirejs.config({
    baseUrl: './',
    paths: {
    	"scripts": "./scripts",
    	"dexie": "./node_modules/dexie/dist/dexie.min"
    }
});

requirejs(['scripts/main']);