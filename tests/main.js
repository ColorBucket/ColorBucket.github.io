const appUrl = 'http://localhost:8089/';

// casper.test.begin(testTitle, numberOfTests, callback)
casper.test.begin('Opening and checking App', 1, function(test){
    casper.start(appUrl);

    casper.then(function() {
	    if(!casper.exists('#colors'))
	   		test.fail('Page is at least opening');

	   	if(!casper.exists('form #inputColor'))
	   		test.fail('Color input did not load properly');

	   	casper.echo('Everything went well', 'INFO');

	   	test.done();
	});
});