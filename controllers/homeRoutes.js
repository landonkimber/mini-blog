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

        const postData = dbPostData.map((post) => post.get({ plain: true }));
        console.log(postData);

        const userData = {
            logged_in: req.session.logged_in || false,
            username: req.session.username || null,
            user_id: req.session.user_id || null
        }

        res.render('homepage', {
            layout: 'main',
            postData: postData,
            userData: userData
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { id: req.session.user_id }
        });
        console.log(userData)
        if (userData) {
            const username = userData.username;
            res.redirect(`/profile/${username}`);
        } else {
            res.status(404).send('User not found');
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/profile/:username', withAuth, async (req, res) => {
    try {
        const userPostData = await User.findOne({
            where: { id: req.session.user_id },
            include: [
                {
                    model: Post,
                },
            ],
        });
        if (!userPostData) {
            return res.status(404).send("Post data not found!");
        }
        const userData = {
            logged_in: req.session.logged_in,
            username: req.session.username,
            user_id: req.session.user_id
        }

        const postData = userPostData.dataValues.Posts.map((post) => post.get({ plain: true }));

        res.render('profile', {
            layout: 'main',
            userData: userData,
            userPostData: postData,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        console.log('Trying fetch . . .')
        console.log(req.params.id)
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
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

        const postData = dbPostData.get({ plain: true });
        console.log(postData);

        const userData = {
            logged_in: req.session.logged_in,
            username: req.session.username,
            user_id: req.session.user_id
        }


        res.render('post', {
            layout: 'main',
            postData: postData,
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect(`/profile/${req.session.username}`);
        return;
    }

    res.render('login');
});


module.exports = router;