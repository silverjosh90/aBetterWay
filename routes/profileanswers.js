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

    var body = req.body
    var question1 = 'questions[question1]'
    var question2 = 'questions[question2]'
    var question3 = 'questions[question3]'
    var question4 = 'questions[question4]'
    answer= {
    question1: body[question1],
    question2: body[question2],
    question3: body[question3],
    question4: body[question4],
    user_answering_id: req.body.user_answering_id,
    question_owner_id: req.body.question_owner_id,
  }
    ProfileAnswers().insert(answer).returning('*').then(function(results){
    console.log(results);
    res.json(results)
  })
  })

module.exports = Api;
