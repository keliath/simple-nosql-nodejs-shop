const path = require("path");

const express = require('express');

const app = express();
const mongoConnect = require('./utils/database').mongoConnect;

app.set('view engine', 'ejs');
app.set('views', 'views'); //type views it wouldnt necessary because its already the deafult value

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorsController = require('./controllers/errors');

app.use((req, res, next) => {
    // const user = new User('carlos', 'test@test.com');
    // user.save();

    User.findById('60f513e69306b4246e0d0a32').then(user => {
        // req.user = user; para almacenar solo las propiedades de la base de datos
        req.user = new User(user.username, user.email, user.cart, user._id); // crear un nuevo objeto para poder usar sus metodos
        // console.log(req.user);
        next();
    }).catch(err => console.log(err));
});

// Browsers will by default try to request /favicon.ico from the root of a hostname, in order to show an icon in the browser tab.
// If you want to avoid this request returning a 404, you can either:
app.get('/favicon.ico', (req, res, next) => {
    res.status(204);
    // next();
}); //with this the console with not print twice

//updated bodyParser for parse body request
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.error404);

mongoConnect(() => {
    app.listen(3000);
});