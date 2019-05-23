const bodyParser = require('body-parser'),
  express = require('express'),
  expressValidator = require('express-validator');

const app = express();

const expressSwagger = require('express-swagger-generator')(app);

let options = {
  swaggerDefinition: {
    info: {
      description: '',
      title: 'Node Api with swagger, jwt and express-validator',
      version: '1.0.0'
    },
    basePath: '/api/v1',
    produces: [
      "application/json"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        description: ""
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./routes.js'] //Path to the API handle folder
};

expressSwagger(options);

//rest API requirements
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(expressValidator());

let apiRouter = require("./routes.js");

app.use('/api/v1', apiRouter);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.listen(process.env.PORT || 3000);