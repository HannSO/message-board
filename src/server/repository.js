let messages = {};

const saveToRepository = (messageBody) => {
  const messageId = getNewMessageId();
  const message = {[messageId]: messageBody};
  messages = {...messages, ...message};
  return message;
};

const getMessages = () => {
  return messages;
};

const getNewMessageId = () => {
  return Object.keys(messages).length + 1;
};


module.exports = {saveToRepository, getMessages};
// module.exports = getMessages();
