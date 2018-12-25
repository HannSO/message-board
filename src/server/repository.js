let messages = {};

const saveToRepository = (messageBody) => {
  const messageId = getNewMessageId();
  const message = {[messageId]: messageBody};
  messages = {...messages, ...message};
  return message;
};

const flushMessages = () => {
  messages = {};
};

const getMessages = () => {
  return messages;
};

const getNewMessageId = () => {
  return Object.keys(messages).length + 1;
};


module.exports = {saveToRepository, getMessages, flushMessages};
