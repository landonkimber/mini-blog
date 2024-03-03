const router = require('express').Router();
const { User , Post } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/get-users', async (req, res) => {
    try{
        console.log('Trying fetch . . .')
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                },
            ]
        });
        if(!dbUserData) {
            return res.status(404).send("User data not found!");
        }
        const userData = dbUserData.map((user) => user.get({ plain: true }));
        console.log(userData);

        return res.status(200).json(userData);
    } catch (err) {
        res.status(200).json(err);
    }
});

module.exports = router;
