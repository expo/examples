import defaultJA from './default'
import openAiChat from './openAiChat'
import routes from './routes'
import settings from './settings'
import users from './users'

const translationJA = {
  translation: {
    ...defaultJA,
    openAiChat,
    routes,
    settings,
    users,
  },
}

export default translationJA
