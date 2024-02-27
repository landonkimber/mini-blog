const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
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
        console.log('TESTING');


        const postData = dbPostData.map((post) => post.get({ plain: true }));
        console.log(postData);

        res.render('homepage', {
            layout: 'main',
            postData: postData,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;