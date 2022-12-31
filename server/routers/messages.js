// empty for now but move messages logic from server.js to here if we ever want to add new paths
const express = require('express')
const path = require('path')
const router = express.Router()
const Message = require(path.resolve('db_models/newMessage'))
const dbController = require(path.resolve('server/controllers/dbController'))

router.get('/', async (req, res) => {
    try {
        const allMessages = await Message.find()
        res.json(allMessages)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
});

router.post('/', async (req, res) => {
    const newMessage = new Message({
        author: req.body.author,
        message: req.body.message
    })
    try {
        await newMessage.save()
        const allMessages = await Message.find();
        res.status(201).json(allMessages);
    } catch (e) {
        res.status(400).json({message: e.message})
    }
});

router.get('/:id', dbController.getMessage, (req, res) => {
    res.status(200).json(res.locals.message)
})

router.patch('/:id', dbController.getMessage, async (req, res) => {
  if (req.body.author !== null) {
    res.locals.message.author = req.body.author
  }
  if (req.body.message !== null) {
    res.locals.message.message = req.body.message
  }
  try {
    const updatedMessage = await res.locals.message.save();
    res.json(updatedMessage)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
})

router.delete('/:id', dbController.getMessage, async (req, res) => {
    try {
        await res.locals.message.remove();
        res.json({ message: 'successfully deleted message from db'})
    } catch (e) {
        res.status(500).json({ message: e.message})
    }
})


module.exports = router;