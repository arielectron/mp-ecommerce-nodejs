var express = require('express');
var exphbs = require('express-handlebars');
const exphbs_sections = require('express-handlebars-sections');
const generarPrefernce = require('./generarPrefernce');

var port = process.env.PORT || 3000

var app = express();

app.engine('handlebars', exphbs({
    helpers: {
        section: exphbs_sections(),
        isNotNull: function (value) {
            return value !== 'null' && value !== null;
        }
    }
}));
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
app.use(express.json());

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', async function (req, res) {
    try{
        const response = await generarPrefernce(req);
        const init_point = response.body.init_point;   
        res.render('detail', {...req.query, init_point});
    } catch (error) {
        console.error(error);
        res.render('error', req.query);
    }
});

app.get('/mp-success', function (req, res) {
    res.render('payment-success', req.query);
});

app.get('/mp-pending', function (req, res) {
    res.render('payment-pending', req.query);
});

app.get('/mp-failure', function (req, res) {
    res.render('payment-fail', req.query);
});

app.post('/mp-notifications', function (req, res) {
    console.log(req.body);
    res.send('OK');
});

app.listen(port);