const chai = require('chai');
const chaiHttp = require('chai-http');
const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;
const server = require('../../src/server/server');
const repository = require('../../src/server/repository');


describe('server', () => {
  repository.saveToRepository('Super interesting');
  repository.saveToRepository('Top secret!');

  server(repository);
  chai.use(chaiHttp);


  it('gets saved messages', (done) => {
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
      .send({message: 'Third Message!'})
      .end((err, res) => {
        if (err) {
          expect(false);
        }
        expect(res.body).to.deep.equal({3: 'Third Message!'});
        expect(res).to.have.status(200);
        done();
      });

  });

});
