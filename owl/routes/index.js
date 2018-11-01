var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', { root: 'public' });
});
/*
router.get('/getcity', function(req, res, next) {
    console.log("In getcity route");
    var fs = require('fs');
    var myRe = new RegExp("^" + req.query.q);

    fs.readFile(__dirname + '/cities.dat.txt', function(err, data) {
        if (err) throw err;
        var cities = data.toString().split("\n");
        for (var i = 0; i < cities.length; i++) {
            //console.log(cities[i]);
            var result = cities[i].search(myRe);
            if (result != -1) {
                //console.log(cities[i]);
            }

            var jsonresult = [];
            for (var i = 0; i < cities.length; i++) {
                var result = cities[i].search(myRe);
                if (result != -1) {
                    //console.log(cities[i]);
                    jsonresult.push({ city: cities[i] });
                }
            }
        }
        res.status(200).json(jsonresult);
    });
});
*/
router.get('/randomWord', function(req, res, next) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    console.log("In random word route");
    var fs = require('fs');
    var words;

    fs.readFile(__dirname + "/words.dat.txt", function(err, data) {
        if (err) throw err;
        words = data.toString().split("\n");
        console.log(words);
        var index = getRandomInt(words.length);
        console.log(index);
        var word = words[index];
        console.log(word);
        var url = "https://owlbot.info/api/v1/dictionary/";
        url += word;
        url += "?format=json";
        console.log(url);
        request(url).pipe(res);
    })
})

router.get('/dictionary', function(req, res, next) {
    var url = "https://owlbot.info/api/v1/dictionary/";
    url += req.query['q'];
    url += "?format=json";
    console.log(url);
    request(url).pipe(res);
});

module.exports = router;
