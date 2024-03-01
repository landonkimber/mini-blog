const router = require('express').Router();
const { Post , User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);

    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/get-posts', async (req, res) => {
    try {
        console.log('Trying fetch . . .')
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        if (!dbPostData) {
            return res.status(404).send("Post data not found!");
        }

        const postData = dbPostData.map((post) => post.get({ plain: true }));
        console.log(postData);

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
