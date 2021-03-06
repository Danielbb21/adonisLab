'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGameSchema extends Schema {
  up () {
    this.create('user_games', (table) => {
      table.increments()
      table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table.string('name').notNullable()
      table.string('description').notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('user_games')
  }
}

module.exports = UserGameSchema
