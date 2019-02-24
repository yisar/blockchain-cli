import vorpal from 'vorpal'
import Blockchain from './blockchain'

const bc = new Blockchain()

const cli = vorpal()

cli
  .command('mine', '挖矿')
  .action(function (args, cb) {
    const newBlock = bc.mine()
    if (newBlock) console.log(newBlock)
    cb()
  })

cli
  .command('chain', '查看区块链')
  .action(function (args, cb) {
    console.log(bc.blockchain)
    cb()
  })


console.log('welcome to cli-blockchain ~')

cli
  .exec('help')
cli
  .delimiter('cli =>')
  .show()


function formatLog(data) {
  if (!Array.isArray(data)) data = [data]
  const head = Object.keys[data[0]]
  const table = new Table({
    head,
    colWidths: new Array(head.length).fill(15)
  })
  const res = data.map(v => {
    return head.map(h => v[h])
  })
  table.push(...res)
}