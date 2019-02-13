const BASE_URL = 'http://localhost:3000';
const log = require('./logger').log;

const postMessage = (message) => {
  const postUrl = BASE_URL + '/message';

  const postBody = {message: message};

  return fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(postBody),

    headers: {
      'Content-Type': 'application/json',
      'referrer-policy': 'no-referrer',
    }
  }).then((res) => {
    if (isOk(res.status)) {
      return res.body;
    } else {
      throw new Error();
    }
  })
    .catch((err) => {
      log(`error posting to ${postUrl}: ${err}`);
    });
};

const getMessages = () => {
  const getUrl = BASE_URL + '/messages';
  return fetch(getUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (isOk(response.status)) {
      return (response.json());
    } else {
      log(`${getUrl} returned status: ${response.status}, body: ${response.body}, error: ${response.error}`);
      throw new Error();
    }
  })
    .catch((err) => {
      log(`error getting ${getUrl}: ${err}`);
    });
};

const deleteMessage = (messageId) => {
  const deleteUrl = BASE_URL + '/message/' + messageId;

  return fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'referrer-policy': 'no-referrer',
    }
  }).then((res) => {
    if (isOk(res.status)) {
      return res.body;
    } else {
      throw new Error();
    }
  })
    .catch((err) => {
      log(`error posting to ${deleteUrl}: ${err}`);
    });
};

const isOk = (responseStatus) => {
  return 200 < responseStatus < 300;
};

module.exports = {postMessage, getMessages, deleteMessage};
