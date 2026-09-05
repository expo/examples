import { atom } from 'recoil'

export type ColorModeRefreshState = {
  mode: 'light' | 'dark' | undefined
}

export const colorModeRefreshState = atom<ColorModeRefreshState>({
  key: 'colorModeRefreshState',
  default: {
    mode: undefined,
  },
})
