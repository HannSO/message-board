const createSubmitButtonListener = require('./ui').createSubmitButtonListener;
const displayMessages = require('./ui').displayMessages;
const getMessages = require('./requests').getMessages;
const postMessage = require('./requests').postMessage;

const doEveryThing = () => {
  createSubmitButtonListener(postMessage);
  displayMessages(getMessages);
  getMessages(displayMessages);
};

doEveryThing();



