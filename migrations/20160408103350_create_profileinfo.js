exports.up = function(knex, Promise) {
  return knex.schema.createTable('profileinfo', function(table){
    table.increments();
    table.string('fb_id')
    table.text('Bio');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profileinfo');
};
