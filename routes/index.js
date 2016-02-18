var express = require('express');
var router = express.Router();

var LineByLineReader = require('line-by-line');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/read', function(req, res, next) {
	lr = new LineByLineReader('public/personer.txt');
	var arr = new Array();
	var sok = req.query.sok.toLowerCase();

	lr.on('line', function (line) {
		lArr = line.split("\t");
		navn = lArr[1].toLowerCase();
		if(navn.indexOf(sok) != -1){
			arr.push(lArr[1]);	
		}
	});

	lr.on('end', function(){
		res.end(JSON.stringify(arr));	
	});	
});

module.exports = router;
