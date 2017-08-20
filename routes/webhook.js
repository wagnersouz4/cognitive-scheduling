const request = require('request');
const conversation = require('../conversation');
const config = require('../config');

const callSendAPI = messageData => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: config.ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {

      console.log('message sent');
    } else {
      console.error('Unable to send message.');
      console.error(response);
      console.error(error);
    }
  });
};

const receivedMessage = async event => {
  try {
    const conversationResponse = await conversation.process(event.message.text);

    const messageData = {
      recipient: { id: event.sender.id },
      message: { text: conversationResponse.output.text[0] }
    };

    callSendAPI(messageData);

  } catch (error) {
    console.log(error);
  }
};

const webhook = {

  get: (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === config.VERIFY_TOKEN) {
      console.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
  },

  read: (req, res) => {
    const data = req.body;
    if (data.object === 'page') {

      // Iterate over each entry - there may be multiple if batched
      data.entry.forEach(function (entry) {

        // Iterate over each messaging event
        entry.messaging.forEach(function (event) {
          if (event.message) {
            receivedMessage(event);
          } else {
            console.log("Webhook received unknown event: ", event);
          }
        });
      });
      res.sendStatus(200);
    }
  }
}

module.exports = webhook;
