import fs from 'fs'
import elliptic from 'elliptic'
const ec = new elliptic.ec('secp256k1')

let keypair = ec.genKeyPair()

const keys = generateKeys()

function getPub(prv) {
  return ec.keyFromPrivate(prv).getPublic('hex').toString()
}

function generateKeys() {
  const fileName = './src/wallet.json'
  try {
    let res = JSON.parse(fs.readFileSync(fileName))
    if (res.prv && res.pub && getPub(res.prv) === res.pub) {
      keypair = ec.keyFromPrivate(res.prv)
      return res
    } else {
      throw '报个错~'
    }
  } catch (e) {
    const res = {
      prv: keypair.getPrivate('hex').toString(),
      pub: keypair.getPublic('hex').toString()
    }

    fs.writeFileSync(fileName, JSON.stringify(res))
    return res
  }
}

function sign({ from, to, amount }) {
  const bufferMsg = Buffer.from(`${from}-${to}-${amount}`)
  let sign = Buffer.from(keypair.sign(bufferMsg).toDER()).toString('hex')
  return sign
}

function verify({ from, to, amount, sign }, pub) {
  const keypairTemp = ec.keyFromPublic(pub, 'hex')
  const bufferMsg = Buffer.from(`${from}-${to}-${amount}`)
  return keypairTemp.verify(bufferMsg, sign)

}

const trans = { from: 'yse', to: '132', amount: 100 }
const signa = sign(trans)
console.log(signa)
trans.sign = signa

const is = verify(trans, keys.pub)
console.log(is)