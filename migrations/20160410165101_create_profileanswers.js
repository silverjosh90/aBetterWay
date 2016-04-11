exports.up = function(knex, Promise) {
  return knex.schema.createTable('profileanswers', function(table){
    table.increments();
    table.string('user_answering_id');
    table.string('question_owner_id');
    table.string('question1');
    table.string('question2');
    table.string('question3');
    table.string('question4');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profileanswers');
};
