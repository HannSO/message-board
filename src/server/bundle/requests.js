const BASE_URL = 'http://localhost:3000';
const log = require('./logger').log;

const postMessage = (message) => {
  const postUrl = BASE_URL + '/message';

  const postBody = {message: message};

  fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(postBody),

    headers: {
      'Content-Type': 'application/json',
      'referrer-policy': 'no-referrer',
    }
  }).then()
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
    if (200 < response.status < 300) {
      return response.body;
    } else {
      log(`${getUrl} returned status: ${response.status}, body: ${response.body}, error: ${response.error}`);
    }
  })
    .catch((err) => log(`error getting ${getUrl}: ${err}`));
};

module.exports = {postMessage, getMessages};
