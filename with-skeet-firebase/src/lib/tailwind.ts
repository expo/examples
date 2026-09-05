import { create } from 'twrnc'
import themeColors from 'tailwindcss/colors'
const tw = create(require(`../../tailwind.config.js`))
export default tw

export const colors: Colors = {
  ...themeColors,
} as Colors

type Colors = {
  [key: string]: {
    [key: number]: string
  }
}
