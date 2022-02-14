const authService = require('./auth.service');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = authService.login(username, password);
      res.status(200).json({
        user,
        token: authService.createToken(user._id.toString()),
      });
    } catch (err) {
      next(err);
    }
  },
};
