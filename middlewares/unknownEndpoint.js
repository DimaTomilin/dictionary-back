const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: 'Unknown Endpoint' });
};

module.exports = unknownEndpoint;
