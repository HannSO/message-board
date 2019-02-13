const createSubmitButtonListener = require('./ui').createSubmitButtonListener;
const displayMessages = require('./ui').displayMessages;
const getMessages = require('./requests').getMessages;

const doEveryThing = () => {
  createSubmitButtonListener();
  displayMessages();
  getMessages().then((messages) => {
    displayMessages(messages);
  });
};

doEveryThing();



