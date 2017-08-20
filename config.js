require('dotenv').config();

const config = {
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  VERIFY_TOKEN: process.env.VERIFY_TOKEN,
  CONVERSATION_USERNAME: process.env.CONVERSATION_USERNAME,
  CONVERSATION_PASSWORD: process.env.CONVERSATION_PASSWORD,
  CONVERSATION_WORKSPACE_ID: process.env.CONVERSATION_WORKSPACE_ID
};

module.exports = config;