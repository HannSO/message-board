const createSubmitButtonListener = (request) => {
  const submitButton = document.getElementById('submit_message');
  submitButton.addEventListener('click', () => {
    const userInput = document.getElementById('message_box').textContent;
    request(userInput);
    document.getElementById('message_box').value = '';
  });
};

const displayMessages = (getMessages) => {
  getMessages(_buildHtml);
};

const _buildHtml = (messages) => {
  _clearMessages();
  Object.entries(messages).map((messageIdAndBody) => _buildElementsForOneMessage(messageIdAndBody));
};

const _buildElementsForOneMessage = (messageIdAndBody) => {
  const messageBody = messageIdAndBody.get(1);
  const line = document.createElement('li');

  const messageElement = document.createElement('p');
  messageElement.text(messageBody);

  line.appendChild(messageElement);
  document.getElementById('all_messages').appendChild(line);
};

const _clearMessages = () => {
  document.getElementById('all_messages').clear();
};

module.exports = {createSubmitButtonListener, displayMessages};