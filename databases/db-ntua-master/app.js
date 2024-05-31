const 
    express = require('express'),
    createError = require('http-errors'),
    path = require('path'),
    logger = require('morgan'),
    cors = require('cors'),
    indexRouter = require('./routes/index')
    apiRouter = require('./routes/api'),
    dashboardRouter = require('./routes/dashboard'),
    productsRouter = require('./routes/products'),
    storesRouter = require('./routes/stores'),
    customersRouter = require('./routes/customers')

const app = express()

// Basic express-pug setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/',indexRouter)
app.use('/dashboard', dashboardRouter)
app.use('/products', productsRouter)
app.use('/stores', storesRouter)
app.use('/customers', customersRouter)
app.use('/api', apiRouter)

// Template error handling
app.use( (req, res, next) => {
  next(createError(404));
});
app.use( (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error')
});

module.exports = app;