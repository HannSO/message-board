const createSubmitButtonListener = require('./ui').createSubmitButtonListener;
const updateAllMessages = require('./ui').updateAllMessages;

const doEveryThing = () => {
  createSubmitButtonListener();
  updateAllMessages();
};

doEveryThing();



