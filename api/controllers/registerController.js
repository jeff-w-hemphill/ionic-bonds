const User = require('../model/User');
const { create } = require('../model/User');

const handleNewUser = async (req, res) => {
    const { username, name } = req.body;
    if (!username || !name) return res.status(400).json({ 'message': 'Username and name are required'});
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        //create and store the new user
        const result = await User.create({ 
            "username": username,
            "name": name 
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${username} created!`})

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser }

