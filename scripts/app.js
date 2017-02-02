requirejs.config({
    baseUrl: './',
    paths: {
    	"scripts": "./scripts",
    	"services": "./scripts/services",
    	"contexts": "./scripts/contexts",
    	"models": "./scripts/models",
    	"dexie": "./vendors/dexie.min"
    }
});

requirejs(['scripts/main']);