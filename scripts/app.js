requirejs.config({
    baseUrl: './',
    paths: {
    	"scripts": "./scripts",
    	"services": "./scripts/services",
    	"contexts": "./scripts/contexts",
    	"models": "./scripts/models",
    	"dexie": "./bower_components/dexie/dist/dexie.min"
    }
});

requirejs(['scripts/main']);