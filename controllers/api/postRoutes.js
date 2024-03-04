const router = require('express').Router();
const { Post , User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const postData = await Post.create({       
            "user_id": req.session.user_id,
            "subject": req.body.subject,
            "content": req.body.content   
    });

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
