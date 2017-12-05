const assert = require('assert');
const nock = require('nock');
const WWPass = require('../lib/wwpass');

describe('WWPass', function() {
  it('creates new instance', function() {
    let client = new WWPass();
    assert(client instanceof WWPass);
  });
  describe('Methods', function() {
    describe('getTicket()', function() {
      let client;
      before(function() {
        client = new WWPass();
      });
      it('exists', function() {
        assert.equal(typeof client.getTicket, 'function');
      });
      it('invokes callback with a valid reply', (done) => {
        nock('https://spfe.wwpass.com').get('/get.json')
          .reply(200, {
            'encoding': 'plain',
            'data': 'Test:2dc1211df4ef72c295d9f7632f93a9a1@p-sp-02-20:16033',
            'result': true,
            'ttl': 600
          });
        client.getTicket((error, data) => {
          assert.equal(error, undefined);
          assert.equal(data.ticket,'Test:2dc1211df4ef72c295d9f7632f93a9a1@p-sp-02-20:16033');
          done();
        });
      });
      it('invokes callback with an invalid reply', (done) => {
        nock('https://spfe.wwpass.com').get('/get.json')
          .reply(0);
        client.getTicket((error) => {
          assert(error instanceof Error);
          done();
        });
      });
      it('resolves with valid reply', () => {
        nock('https://spfe.wwpass.com').get('/get.json')
          .reply(200, {
            'encoding': 'plain',
            'data': 'Test:2dc1211df4ef72c295d9f7632f93a9a1@p-sp-02-20:16033',
            'result': true,
            'ttl': 600
          });
        return client.getTicket().then( (result) => {
          assert.equal(result.ticket,'Test:2dc1211df4ef72c295d9f7632f93a9a1@p-sp-02-20:16033');
        });
      });
      it('rejects non-200 replies', () => {
        nock('https://spfe.wwpass.com').get('/get.json')
          .reply(201, {
            'encoding': 'plain',
            'data': 'Test:2dc1211df4ef72c295d9f7632f93a9a1@p-sp-02-20:16033',
            'result': true,
            'ttl': 600
          });
        return client.getTicket()
          .then(() => {
            return Promise.reject('Expected to reject');
          }, (err) => {
            assert(err instanceof Error);
          });
      });
    });
  });
});