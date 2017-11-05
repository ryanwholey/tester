var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var _ = require('lodash');

var app = express();


app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.resolve(__dirname, '../client/templates'),
}));

app.set('view engine', 'handlebars');
app.set('port', process.env.RWHOLEY_PORT || 8080);
app.set('host', process.env.RWHOLEY_HOST || 'localhost');

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse and set reqData
app.use(function(req, res, next) {
	req.reqData = {};

	if (req.method === 'GET') {
		req.reqData = req.query;
	} else if (req.method === 'POST') {
		req.reqData = _.assign({}, req.body);
	} else {
		res.status(400).send('404 - bad http method');
		return;
	}

	next();
});

// routes
app.use('/', function(req, res) {
	res.render(path.resolve(__dirname, '../client/templates/home'), {
		requestMethod: req.method,
		data: req.reqData
	});
});

app.listen(app.get('port'), app.get('host'), function(err) {
	if (err) {
		console.error('Error starting server...');
		process.exit(1);
	}

	console.log('Server started at', app.get('host') + ':' + app.get('port'));
});
