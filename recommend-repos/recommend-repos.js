//want to make this request
//curl -u jenyeeiam:26db0c6060a3c6029aeecef9971d255cfa67b792 https://api.github.com/repos/lighthouse-labs/laser_shark/contributors

var request = require('request');
var fs = require("fs");
require('dotenv').config();


var username = 'jenyeeiam';
var api_token = process.env['GITHUB_API_TOKEN'];
const ENDPOINT = 'https://api.github.com/repos/';
var owner = 'lighthouse-labs';
var repo = 'laser_shark';
//object.assign
//json.parse
//json.stringify

// var githubOptions = {
//   auth: {
//       'user': username,
//       'pass': api_token,
//       'sendImmediately': false
//     },
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
//     },
//     json:true
// }


var getRepoContributors = function(owner, repo, cb){



  request.get({
    url: ENDPOINT + owner + "/" + repo + "/contributors",
    auth: {
      'user': username,
      'pass': api_token,
      'sendImmediately': false
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
    },
    json:true
  }, function (err, response, body){
    cb(err, body);
  });
}


getRepoContributors(owner, repo, function (err, result) {
  if (err) {
    throw err;
  }
  var starredArr = [];
  result.forEach(function(cv, index){
    starredArr.push(cv.starred_url);
  });

  //this request goes in the forEach loop, each time make a request and make a running count of the repos
  request.get({
    url: starredArr[0].replace("{/owner}{/repo}", ""),
    auth: {
      'user': username,
      'pass': api_token,
      'sendImmediately': false
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
    },
    json:true
  }, function(err, response, body){
    console.log(body[0].full_name);
  });


});


// request.get({
//       url: ENDPOINT + owner + "/" + repo + "/contributors/",
//       auth: {
//         'user': username,
//         'pass': api_token,
//         'sendImmediately': false
//       },
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0',
//       },
//       json:true
//     }, function (err, response, body) {
//       console.log(body);
//     });