const getMessages = require('./requests').getMessages;
const postMessage = require('./requests').postMessage;
const deleteMessage = require('./requests').deleteMessage;

const createSubmitButtonListener = () => {
  const submitButton = document.getElementById('submit_message');
  submitButton.addEventListener('click', () => {
    const userInput = document.getElementById('message_box').value;
    postMessage(userInput)
      .then(() => updateAllMessages());
    document.getElementById('message_box').value = '';
  });
};

const updateAllMessages = () => {
  getMessages().then((messages) => _displayMessages(messages));
};

const _displayMessages = (messages) => {
  _buildHtml(messages);
};

const _createDeleteButtonListener = (deleteButton) => {
  deleteButton.addEventListener('click', () => {
    deleteMessage(deleteButton.id)
      .then(() => updateAllMessages());
  });
};

const _buildHtml = (messages) => {
  _clearMessages();
  Object.entries(messages).map((messageIdAndBody) => _buildElementsForOneMessage(messageIdAndBody));
};

const _buildElementsForOneMessage = (messageIdAndBody) => {
  const messageBody = messageIdAndBody[1];
  const messageId = messageIdAndBody[0];
  const line = document.createElement('li');

  const messageElement = document.createElement('p');
  messageElement.innerHTML = messageBody;

  const deleteButton = document.createElement('BUTTON');
  deleteButton.setAttribute('id', messageId);
  deleteButton.innerHTML = 'Remove Message';
  _createDeleteButtonListener(deleteButton, deleteMessage);

  line.setAttribute('id', messageId);
  line.appendChild(messageElement);
  line.appendChild(deleteButton);
  document.getElementById('all_messages').appendChild(line);
};

const _clearMessages = () => {
  const allMessages = document.getElementById('all_messages');
  while (allMessages.firstChild) {
    allMessages.removeChild(allMessages.firstChild);
  }
};

module.exports = {createSubmitButtonListener, updateAllMessages};