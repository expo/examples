import { useMemo } from 'react'
import { defaultRoutes } from '@/routes/DefaultRoutes'
import { userRoutes } from '@/routes/UserRoutes'
import { toKebabCase } from '@/utils/character'

type Screens = {
  [key: string]: string
}

export default function useScreens() {
  const defaultScreens = useMemo(() => {
    const screens: Screens = {}
    defaultRoutes.forEach((route) => {
      screens[route.name] = toKebabCase(route.name)
    })
    return screens
  }, [])

  const userScreens = useMemo(() => {
    const screens: Screens = {}
    userRoutes.forEach((route) => {
      screens[route.name] = toKebabCase(route.name)
    })
    return screens
  }, [])

  return {
    defaultScreens,
    userScreens,
  }
}
