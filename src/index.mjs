import vorpal from 'vorpal'
import Table from 'cli-table'
import Blockchain from './blockchain'

const bc = new Blockchain()

const cli = vorpal()

cli
  .command('mine <address>', '挖矿')
  .action(function (args, cb) {
    const newBlock = bc.mine(args.address)
    if (newBlock) formatLog(newBlock)
    cb()
  })

cli
  .command('chain', '查看区块链')
  .action(function (args, cb) {
    formatLog(bc.blockchain)
    cb()
  })

cli
  .command('trans <from> <to> <amount>', '转账')
  .action(function (args, cb) {
    let trans = bc.transfer(args.from, args.to, args.amount)
    if(trans) formatLog(trans)
    cb()
  })

cli
  .command('detail <index>', '查看区块详情')
  .action(function (args, cb) {
    const block = bc.blockchain[args.index]
    this.log(JSON.stringify(block, null, 2))
    cb()
  })

cli
  .command('blance <address>', '查看区块详情')
  .action(function (args, cb) {
    const blance = bc.blance(args.address)
    if (blance) formatLog({ blance, address: args.address })
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
  const head = Object.keys(data[0])
  const table = new Table({
    head,
    colWidths: new Array(head.length).fill(15)
  })
  const res = data.map(v => {
    return head.map(h => JSON.stringify(v[h], null, 1))
  })
  table.push(...res)
  console.log(table.toString())
}