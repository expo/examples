import defaultEN from './default'
import openAiChat from './openAiChat'
import routes from './routes'
import settings from './settings'
import users from './users'

const translationEN = {
  translation: {
    ...defaultEN,
    openAiChat,
    routes,
    settings,
    users,
  },
}

export default translationEN
