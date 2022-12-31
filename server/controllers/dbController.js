const path = require('path');
const Message = require('../../db_models/newMessage')

const dbController = {};

dbController.getMessage = async (req, res, next) => {
    let message;
    try {
        message = await Message.findById(req.params.id);
        if (message === null) {
            return res.status(404).json({ message: 'no message with that id'})
        }
    } catch (e) {
        console.log('GETMESSAGE ERROR: ', e);
        res.status(500).json({ message: e.message })
    }

    res.locals.message = message;
    return next();
}


module.exports = dbController;