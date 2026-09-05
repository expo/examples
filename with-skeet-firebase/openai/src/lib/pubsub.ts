import { PubSub } from '@google-cloud/pubsub'
import { CloudEvent } from 'firebase-functions/lib/v2/core'
import { MessagePublishedData } from 'firebase-functions/v2/pubsub'

export const pubsubPublish = async <T>(topicName: string, json: T) => {
  try {
    const pubsub = new PubSub()
    const messageId = await pubsub.topic(topicName).publishMessage({ json })
    console.log(`Message ${messageId} published.`)
    return messageId
  } catch (error) {
    console.log(`pubsubPublish: ${JSON.stringify(error)}`)
    throw new Error(JSON.stringify(error))
  }
}

export const createTopic = async (topicName: string) => {
  try {
    const pubsub = new PubSub()
    const [topic] = await pubsub.createTopic(topicName)
    console.log(`Topic ${topic.name} created.`)
    return topic.name
  } catch (error) {
    console.log(`createTopic: ${JSON.stringify(error)}`)
    throw new Error(JSON.stringify(error))
  }
}

export const parsePubSubMessage = <T>(
  event: CloudEvent<MessagePublishedData<any>>
) => {
  let pubsubMessage = ''
  try {
    pubsubMessage = Buffer.from(event.data.message.data, 'base64').toString(
      'utf-8'
    )
  } catch (err) {
    throw new Error(`Failed to decode pubsub message: ${err}`)
  }

  let pubsubObject: T
  try {
    pubsubObject = JSON.parse(pubsubMessage)
    return pubsubObject
  } catch (err) {
    throw new Error(`Failed to parse pubsub message: ${err}`)
  }
}
