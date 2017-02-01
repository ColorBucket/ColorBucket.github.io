define(function (require) { 

	const Dexie = require('dexie');

	const db = new Dexie("colorbucket_database");
    db.version(1).stores({
        colors: '_id,userId,color,name,date'
    });

    db.open().catch(function (e) {
        alert ("Open failed: " + e);
    });

    return db;
});