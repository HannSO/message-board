const describe = require('mocha').describe;
const it = require('mocha').it;
const afterEach = require('mocha').afterEach;
const expect = require('chai').expect;
const repository = require('../../src/server/repository');

describe('repository', () => {

  afterEach(() => {
    repository.flushMessages();
  });

  it('saves messages to repository and returns object with a new id each time', () => {
    expect(repository.saveToRepository('message')).to.deep.equal({1:'message'});
    expect(repository.saveToRepository('message2')).to.deep.equal({2:'message2'});
  });

  it('gets messages', () => {
    repository.saveToRepository('message');
    repository.saveToRepository('message2');
    const expectedMessages = {1:'message', 2:'message2'};
    expect(repository.getMessages()).to.deep.equal(expectedMessages);
  });


});
