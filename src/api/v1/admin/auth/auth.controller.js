const authService = require('./auth.service');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await authService.login(username, password);
      const token = authService.createToken(user._id.toString());
      res.status(200).json({
        token,
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  },
};
