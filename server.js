
const express = require('express');
const dayjs = require('dayjs');
const config = require('./config.json');
const session = require('express-session');

const app = express();
app.use(session({
	secret: process.env.MYBLOG_SECRET_KEY,
	cookie: { maxAge: config.cache.std_ttl },
	saveUninitialized: false,
	resave: true
}));

// Import routing scripts
const userRoutes = require('./routes/userRoutes');
const indexRoutes = require('./routes/indexRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes.js');

// Import database scripts
const database = require('./database/database.js');
const userTable = require('./database/tables/userTable.js');

// Set JSON url encoding.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DayJS configuration
var timezone = require('dayjs/plugin/timezone');
var customParseFormat = require('dayjs/plugin/customParseFormat');
var utc = require('dayjs/plugin/utc');
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.tz.setDefault(config.default_timezone);

// Register EJS View engine
app.set('view engine', config.view_engine);

//app.use('/public', express.static('public'));
app.use(express.static(__dirname + '/public'));

// Listen for requests
app.listen(config.port);

// Index routes
app.use('/', indexRoutes);

// Blog routes
app.use('/user', userRoutes);

// Signup routes
app.use('/signup', signupRoutes);

// Login routes
app.use('/login', loginRoutes);

// 404 page
app.get('/error', (req, res) => {
	res.render('error');
});

app.use((req, res) => {
	res.redirect('/error');
});

