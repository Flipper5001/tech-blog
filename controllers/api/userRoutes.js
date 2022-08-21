const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // create new user
    const userData = await User.create(req.body);
    // register user_id and state logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.post_id
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
      // attempt to find username based on user input
      const userData = await User.findOne({ where: { username: req.body.username } });
      // if no user is found send error incorrect username
      if (!userData) {
          res.status(400).json({ message: 'Incorrect username or password' });
          return;
      }
      // attempt to find password based on user input
      const validPassword = await userData.checkPassword(req.body.password);
      // if no password is found send error incorrect password
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect username or password' });
          return;
      }
      // if user and password match save to session
      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          req.session.post_id
          res.redirect('/dashboard')
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

// when post logout, destroy session
router.post('/logout', (req, res) => {
    // check if user is actually logged in
    if (req.session.logged_in) {
        // end and destroy session
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
        // if user was not logged in end and send error
      res.status(404).end();
    }
  });

module.exports = router