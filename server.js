var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'})); 			 
app.use(bodyParser.json()); 									 

app.get('/', function(req, res){
});
app.post('/find', function(req, res) {
	var bibkeys = req.body.bibkey;      //get string from browser
	var bibkeyArray = bibkeys.split(",");
	var request = require('request');
	request('https://openlibrary.org/api/books?bibkeys='+bibkeys+'&format=json&jscmd=data', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var book = JSON.parse(body);
			var length = bibkeyArray.length;
			var booksString = "";
			var booksArray = [];
			for(var i = 0; i<length;i++){
				var part1 = bibkeyArray[i].substring(0,4);
				var part2 = bibkeyArray[i].substring(5);
				var _title = book[part1+':'+part2].title;
				var _url = book[part1+':'+part2].url;
				var _pages = book[part1+':'+part2].number_of_pages;
				var _subtitle = book[part1+':'+part2].subtitle;
				//var sbook = "{subtitle :" + _subtitle + ", title :" + _title + ", url:" + _url + ", number_of_pages :" + _pages + "}";
				var obook = {subtitle:_subtitle,title:_title,url:_url,number_of_page:_pages};
				booksArray[i] = obook;
			}
			res.json(booksArray);
			//var part1 = bibkeys.substring(0,4);
			//var part2 = bibkeys.substring(5);
			//var _subtitle =  book[part1+':'+part2].subtitle;
			//var _title = book[part1+':'+part2].title;
			//var _url = book[part1+':'+part2].url;
			//var _pages = book[part1+':'+part2].number_of_pages;
			//res.json({subtitle:_subtitle, title:_title, url:_url, number_of_pages:_pages});
		}
	});
});
app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 
});


app.listen(80);


