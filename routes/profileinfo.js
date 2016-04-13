var express = require('express');
var Api= express.Router();
var knex = require('../db/knex')

/* GET users listing. */

function Profileinfo() {
  return knex('profileinfo')
}

Api.route('/')
  .get(function(req,res){
    Profileinfo().select().then(function(results){
      res.json(results)
    })
  })

Api.route('/submit')
  .post(function(req, res, next) {
    Profileinfo().select().where({id: req.body.id}).first().then(function(results){
      if(results !== undefined) {
        Profileinfo().update(req.body).where({id: results.id}).then(function(rest){
          console.log('updated');
          res.json(req.body)
        })
      }
    })

  });

Api.route('/create')
  .post(function(req,res,next){
    console.log(req.body.fb_id);

    Profileinfo().select().where({fb_id: req.body.fb_id}).first().then(function(results){
      if(results == undefined){
        var profileinfo = {
          fb_id: req.body.fb_id,
          Bio: ''
        }
        Profileinfo().insert(profileinfo).returning('*').then(function(rest){
          console.log(rest);
          res.json(rest[0])
        })
      }
    })
  })


module.exports = Api;
