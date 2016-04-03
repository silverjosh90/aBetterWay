exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table){
    table.string('message');
    table.string('sender_id');
    table.string('receiver_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
