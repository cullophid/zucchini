import assert from 'assert'
import {matchesTags, featureMatchesTags} from '../helpers'

describe('matchesTags', () => {
  it('should return true if the tagslist contains no whitelisted tags', () => {
    assert.equal(matchesTags(['~@invalid'], {tags: [{name: '@valid'}]}), true)
  })

  it('should return true if the feature contains a whitelisted tag', () => {
    assert.equal(matchesTags(['@tag1', '@valid'], {tags: [{name: '@valid'}]}), true)
  })

  it('should return false if the feature does not contain a whitelisted tag', () => {
    assert.equal(matchesTags(['@valid'], {tags: [{name: '@invalid'}]}), false)
  })

  it('should return false if the feature contains a blacklisted tag', () => {
    assert.equal(matchesTags(['@valid', '~@invalid'], {tags: [{name: '@invalid'}, {name: '@valid'}]}), false)
  })
})


describe('featureMatchesTags', () => {
  it('should return true if the feature contains a valid tag', () => {
    const feature = [ 0, { feature: { tags: [{ name: '@valid' }] } } ]
    assert.equal(featureMatchesTags(['@tag1', '@valid'], feature), true)
  })

  it('should return true if any of the features scenarios contains a valid tag', () => {
    const feature = [0, {
      feature: {
        tags: [{name: '@invalid'}],
        children: [
          {
            tags: [{name: '@invalid'}]
          },
          {
            tags: [{name: '@valid'}]
          }
        ]
      }
    }]
    assert.equal(featureMatchesTags(['@valid'], feature), true)
  })

  it('should return false if no valid tags could be found', () => {
    const feature = [0, {
      feature: {
        tags: [{name: '@invalid'}],
        children: [
          {
            tags: [{name: '@invalid'}]
          },
          {
            tags: [{name: '@invalid'}]
          }
        ]
      }
    }]
    assert.equal(featureMatchesTags(['@valid'], feature), false)
  })
})
