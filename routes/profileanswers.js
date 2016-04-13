var express = require('express');
var Api= express.Router();
var knex = require('../db/knex')

/* GET users listing. */

function ProfileAnswers() {
  return knex('profileanswers')
}
Api.route('/')
  .get(function(req,res){
    ProfileAnswers().select().then(function(results){
      console.log('profile answer results');
      console.log(results);
      res.json(results)
    })
  })

Api.route('/answers')
  .post(function(req,res){
    ProfileAnswers().select().where({asker_id: req.body.asker_id, answerer_id: req.body.answerer_id}).then(function(results){
      console.log(results);
      if (!results.length) {
        ProfileAnswers().insert(req.body).returning('*').then(function(data){
          console.log('got here');
          res.json(data)
        })
      }
      else {
        ProfileAnswers().select().update(req.body).returning('*').where({asker_id: req.body.asker_id, answerer_id: req.body.answerer_id}).then(function(result){
          console.log('got to update');
          console.log(result);
          res.json(result)
        })
      }
  })
  })

module.exports = Api;
