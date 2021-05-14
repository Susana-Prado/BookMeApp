module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('adios')
      next();
    } else {
      console.log('hola')
      return res.status(403).json({ message: 'Forbidden' });
    }
  },
  isLoggedOut: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.status(403).json({ message: 'Forbidden' });
    } else {
      next();
    }
  },
};