const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedDB = async () => {
    try {
        await sequelize.sync({ force: true }); 
        
        const user1 = await User.create({
            username: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        });

        const post1 = await Post.create({
            user_id: user1.id,
            subject: 'First Post',
            content: 'This is the content of the first post.',
        });

        const comment1 = await Comment.create({
            user_id: user1.id,
            post_id: post1.id,
            content: 'Great post! Keep it up!'
        });

        const user2 = await User.create({
            username: 'Jane Doe',
            email: 'jane@example.com',
            password: 'password456',
        });

        const post2 = await Post.create({
            user_id: user2.id,
            subject: 'Second Post',
            content: 'This is the content of the second post.',
        });

        const comment2 = await Comment.create({
            user_id: user2.id,
            post_id: post2.id,
            content: 'Nice work on the second post!'
        });

        const comment3 = await Comment.create({
            user_id: user1.id,
            post_id: post2.id,
            content: 'I agree, the second post is really good.'
        });

        console.log('DB SEEDED');
    } catch (error) {
        console.error('Error seeding data:', error);
    } 
};

seedDB();