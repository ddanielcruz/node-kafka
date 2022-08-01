import { CompressionTypes, Partitioners } from 'kafkajs'
import { kafka } from './kafka'

const program = async () => {
  console.log(`Sending messages to consumers`)

  const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
  await producer.connect()

  setInterval(async () => {
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: `Message ${Date.now()}!` }],
      compression: CompressionTypes.GZIP
    })
  }, 250)
}

program()
