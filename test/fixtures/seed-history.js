// reads json file and inserts it into mongodb
const historyJSON = require('../mock-data/voltage-history-7days.json')
const HistoryModel = require('../../src/history/history.model')


const main = async () => {
  for (const item of historyJSON) {
    console.log(item)
    await new HistoryModel(item).save()
  }

  const res = await HistoryModel.find()
  console.log(res)
}
main()
