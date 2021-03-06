// @flow
/* eslint-env mocha */

const assert = require('assert')
const { describe, it, before } = require('mocha')
const uuid = require('uuid')

const { getTestNodeId } = require('../test/util')
const { MediachainNode: AlephNode } = require('../src/peer/node')
const { concatNodeClient, concatNodePeerInfo } = require('./util')

const seedObjects = [
  {id: uuid.v4(), foo: 'bar'},
  {id: uuid.v4(), hello: 'world'}
]

describe('Remote Data Fetching', () => {
  let dataIds = []
  let concatClient

  before(() => {
    return concatNodeClient()
      .then(client => { concatClient = client })
      .then(() => concatClient.putData(...seedObjects))
      .then(ids => { dataIds = ids })
  })

  it('can fetch data from a remote concat node', () => {
    let alephNode
    return getTestNodeId().then(id => { alephNode = new AlephNode({peerId: id}) })
      .then(() => alephNode.start())
      .then(() => concatNodePeerInfo())
      .then(concatInfo => alephNode.remoteData(concatInfo, dataIds))
      .then(results => {
        assert(results != null && results.length > 0, 'remote data fetch returned no results')

        for (let i = 0; i < results.length; i++) {
          const key = results[i].key
          assert.equal(key, dataIds[i], 'remote data fetch should return objects with same keys as query')
        }
      })
  })
})
