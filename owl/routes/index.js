var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('weather.html', { root: 'public' });
});

router.get('/randomWord', function(req, res, next) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    console.log("In random word route");
    var fs = require('fs');
    var words;
    var index;
    var word = [];
    var url;

    fs.readFile(__dirname + "/words.dat.txt", function(err, data) {
        if (err) throw err;
        words = data.toString().split("\n");
        console.log(words);
        index = getRandomInt(words.length);
        console.log(index);
        word = words[index];
        fs.writeFile(__dirname + '/word.txt', word, function(err) {
            if (err) throw err;
            console.log('Replaced!');
        });
        console.log(word);
        url = "https://owlbot.info/api/v1/dictionary/";
        url += word;
        url += "?format=json";
        console.log(url);
        
        //console.log(myRequest);
        request(url).pipe(res);
    })
})

router.get('/word', function(req, res, next) {
    var fs = require('fs');
    fs.readFile(__dirname + '/word.txt', function(err, data) {
        if (err) throw err;
        var word = data.toString();
        res.status(200).json(word);
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
