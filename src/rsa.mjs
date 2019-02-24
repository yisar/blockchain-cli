import fs from 'fs'
import elliptic from 'elliptic'
const ec = new elliptic.ec('secp256k1')

let keypair = ec.genKeyPair()

const res = generateKeys()
console.log(res)

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

function getPub(prv) {
  return ec.keyFromPrivate(prv).getPublic('hex').toString()
}