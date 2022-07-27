import { kafka } from './kafka'

const program = async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic} [${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- [${prefix}] ${message.key || 'empty'}#${message.value}`)
    }
  })
}

program()
