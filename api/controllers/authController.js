const User = require('../model/User');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required'});
    
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate pwd
    const match = true
    if (match) {
        console.log("nice")
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };