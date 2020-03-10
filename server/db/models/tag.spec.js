/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Tag = db.model('tag')

describe('Tag model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  beforeEach(() => {
    Tag.build({
      tags: ['Metro Cards', 'Gloves']
    })
  })
  afterEach(() => {
    return Promise.all([Tag.truncate({cascade: true})])
  })

  describe('definition of Tag attributes', () => {
    it('includes `tags` fields', () => {
      return Tag.save().then(savedTags => {
        expect(savedTags.tags).to.have.length(2)
        expect(savedTags.tags).to.equal('Metro Cards', 'Gloves')
      })
    })
  })
}) // end describe('Tag model')
