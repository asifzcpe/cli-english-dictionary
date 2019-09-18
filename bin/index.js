#!/usr/bin/env node
var unirest = require("unirest");
var app_id  = "702d7808"
var app_key  = "0f569eff54ea0496c08ea96f6b5c17fe"
var endpoint = "entries"
var language_code = "en-us"
var word_id = process.argv[2];

	
if(typeof word_id==='undefined'){
	console.log("Please, enter word to search like: define YOUR_WORD");
	return;
}
var api_url="https://od-api.oxforddictionaries.com/api/v2/" + endpoint + "/" + language_code + "/" + word_id;
var req = unirest("GET", api_url);

// req.query({
// 	"term": "transform"
// });

req.headers({
	"app_id":app_id,
	"app_key":app_key
});


req.end(function (res) {
	if (res.error){
		console.log("The word you are searching is not in database");
		return;
	}
	else{
		var data=res.body.results[0].lexicalEntries[0];
		var senses=data.entries[0].senses;
		senses.forEach((definition,index)=>{
			index+=1;
			console.log(index+". "+definition.definitions[0]+" ("+data.lexicalCategory.text+")");
		});
	}

});