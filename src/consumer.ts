import { argv } from 'process'

import { kafka } from './kafka'

const groupId = argv[2] || 'consumer'

const program = async () => {
  const consumer = kafka.consumer({ groupId })
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic} [${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`[${prefix}] ${message.value}`)
    }
  })
}

program()
