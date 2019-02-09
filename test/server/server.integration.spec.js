const chai = require('chai');
const chaiHttp = require('chai-http');
const describe = require('mocha').describe;
const before = require('mocha').before;
const afterEach = require('mocha').afterEach;
const it = require('mocha').it;
const expect = require('chai').expect;
const server = require('../../src/server/server').createServer;
const repository = require('../../src/server/repository');


describe('server', () => {

  before(() => {
    server(repository);
    chai.use(chaiHttp);
  });

  afterEach(() => {
    repository.flushMessages();
  });

  it('gets saved messages', (done) => {
    repository.saveToRepository('Super interesting');
    repository.saveToRepository('Top secret!');
    chai.request('http://localhost:3000')
      .get('/messages')
      .end((err, res) => {
        if (err) {
          expect(false);
        }
        expect(res.body).to.deep.equal({1: 'Super interesting', 2: 'Top secret!'});
        expect(res).to.have.status(200);
        done();
      });

  });

  it('posts message', (done) => {
    chai.request('http://localhost:3000')
      .post('/message')
      .send({message: 'A message!'})
      .end((err, res) => {
        if (err) {
          expect(false);
        }
        expect(res.body).to.deep.equal({1: 'A message!'});
        expect(res).to.have.status(200);
        expect(repository.getMessages()).to.deep.equal({1: 'A message!'});
        done();
      });
  });

});
