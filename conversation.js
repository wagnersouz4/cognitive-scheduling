
const Conversation = require('watson-developer-cloud/conversation/v1');
const config = require('./config');

const conversation = new Conversation({
  username: config.CONVERSATION_USERNAME,
  password: config.CONVERSATION_PASSWORD,
  url: 'https://gateway.watsonplatform.net/conversation/api',
  version_date: Conversation.VERSION_DATE_2017_04_21
});

let context;

const payload = {
  workspace_id: config.CONVERSATION_WORKSPACE_ID,
};

const sendToConversation = () => {
  return new Promise((resolve, reject) => {
    conversation.message(payload, function (error, data) {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      resolve(data);
    });
  });
};

const process = async text => {
  try {
    payload.context = context || {};
    payload.input = { text } || {};

    const response = await sendToConversation(payload);

    context = response.context;
    return response;

  } catch (error) {
    console.log(error);
  }
}

module.exports = { process };