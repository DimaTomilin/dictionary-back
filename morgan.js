const morgan = require('morgan');

exports.morganBodyLogger = morgan((tokens, req, res, next) => {
  morgan.token('body', (req, res) => JSON.stringify(req.body));
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens.body(req, res),
  ].join(' ');
});

// add here any logger function you want
