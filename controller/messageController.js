const Message = require("../models/message");

async function addMessage(data) {
    try {
        const message = new Message(data);
        await message.save();
        return message
    } catch (error) {
       return error
    }
}


module.exports = {
    addMessage
}