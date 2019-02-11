const createSubmitButtonListener = (postMessage, getMessages) => {
  const submitButton = document.getElementById('submit_message');
  submitButton.addEventListener('click', () => {
    const userInput = document.getElementById('message_box').value;
    postMessage(userInput)
      .then(() => getMessages())
      .then((messages) => displayMessages(messages));
    document.getElementById('message_box').value = '';

  });
};

const displayMessages = (messages) => {
  _buildHtml(messages);
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
  line.setAttribute('id', messageId);

  line.appendChild(messageElement);
  document.getElementById('all_messages').appendChild(line);
};

const _clearMessages = () => {
  const allMessages = document.getElementById('all_messages');
  while (allMessages.firstChild) {
    allMessages.removeChild(allMessages.firstChild);
  }
};

module.exports = {createSubmitButtonListener, displayMessages};