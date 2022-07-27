import { CompressionTypes, Partitioners } from 'kafkajs'
import { kafka } from './kafka'

const SAMPLE = 10

const program = async () => {
  console.log(`Sending ${SAMPLE} messages`)

  const producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
  await producer.connect()

  for (let idx = 0; idx < SAMPLE; idx++) {
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: `Message ${idx}!` }],
      compression: CompressionTypes.GZIP
    })
  }

  await producer.disconnect()
}

program()
