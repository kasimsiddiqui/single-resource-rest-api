'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/nfl_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Nfl = require(__dirname + '/../models/nfl');

describe('the nfl resource', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to get to nfl', function(done) {
    chai.request(url)
      .get('/nfl')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should be able to create a nfl player', function(done) {
    chai.request(url)
      .post('/nfl')
      .send({team: 'seahawks', playerName: 'marshawn lynch'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.team).to.eql('seahawks');
        expect(res.body.playerName).to.eql('marshawn lynch');
        done();
      });
  });

  describe('routes that need a nfl player in the database', function() {
    beforeEach(function(done) {
      var testNfl = new Nfl({team: 'seahawks', playerName: 'marshawn lynch'});
      testNfl.save(function(err, data) {
        if (err) throw err;
        this.testNfl = data;
        done();
      }.bind(this));
    });

   it('should be able to update a nfl player', function(done) {
      chai.request(url)
        .put('/nfl/' + this.testNfl._id)
        .send({playerName: 'russell wilson'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
   });

   it('should be able to delete a player', function(done) {
      chai.request(url)
        .delete('/nfl/' + this.testNfl._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
   });

  });
});
