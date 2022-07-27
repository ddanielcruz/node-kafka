import { Kafka, logLevel } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'node-kafka',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN
})
