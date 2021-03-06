// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(err, req, res, next) {
  // Do not show any sensitive info if error is without status
  console.error(err);
  if (!err.status) {
    return res.status(500).json({});
  }
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
}
