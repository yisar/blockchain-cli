import crypto from 'crypto'

const INIT_BLOCK = {
  index: 0,
  prevHash: '0',
  data: 'hello clicli!',
  timestamp: 1550988664781,
  nonce: 73479,
  hash: '0000cf4a6139c07ef04792b79ad48142e957198e20a4d03d1008cf35f77e7b7c'
}

class BlockChain {
  constructor() {
    this.blockchain = [INIT_BLOCK]
    this.data = []
    this.difficulty = 4
  }

  mine() {
    let
      index = this.blockchain.length,
      prevHash = this.getLastBlock().hash,
      data = this.data,
      timestamp = new Date().getTime(),
      nonce = 0

    let hash = this.computeHash(index, prevHash, timestamp, data, nonce)
    while (hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
      nonce++
      hash = this.computeHash(index, prevHash, timestamp, data, nonce)
    }

    console.log('挖矿完毕', { index, prevHash, timestamp, data, nonce, hash })

  }

  getLastBlock() {
    return this.blockchain[this.blockchain.length - 1]
  }

  generateNewBlock() {

  }

  computeHash(index, prevHash, timestamp, data, nonce) {
    return crypto
      .createHash('sha256')
      .update(index + prevHash + timestamp + data + nonce)
      .digest('hex')
  }

  isValidBlock() {

  }

  isValidaChain() {

  }
}

let bc = new BlockChain()

bc.mine()