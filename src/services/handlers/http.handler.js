'use strict'

import React from 'react';
const ApiRoute = 'http://localhost:3010/api';

function buildRequestOptions(method) {
	let headers = {
			"Content-Type": "application/json",
			"authorization-token": window.localStorage.getItem('userToken')
		};

	let requestOptions = { 
			method: method,
			headers: headers,
		};

	return requestOptions;
}

function request(route, method, data) {
	route = ApiRoute + route;
	var requestOptions = buildRequestOptions(method);

    if(method !== 'GET' && data)
    	requestOptions.body = JSON.stringify(data);

    return fetch(route, requestOptions)
	    .then(function(response) {
	      return response.json();
	    })
	    .then(response => {
	    	if(response.code == "B101") {
	    		let repopulateOnboardingData = localStorage.onboarded ? true : false;
	    		
	    		localStorage.clear();

	    		if(repopulateOnboardingData)
	    			localStorage.onboarded = "true";

	    		return window.location = "/#/login";
	    	}

	    	return response;
	    });
}

export default { request };