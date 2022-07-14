const User = require('../model/User');

const handleLogin = async (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ 'message': 'Username required'});
    
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate pwd
    const match = true
    if (match) {
        res.status(200).json({ 'name': foundUser.name })
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };