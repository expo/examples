import { useUser } from '@clerk/clerk-expo'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { SignOutButton } from '../../components/SignOutButton'

export default function Home() {
  const { user } = useUser()
  const [data, setData] = useState()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const fn = async () => {
      try {
        const r = await fetch('/api')
        const json = await r.json()
        setData(json)
      } catch (e) {
        setError(e)
      }
    }
    void fn()
  }, [])

  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Response from API:</Text>
      {Boolean(error) && <Text>Error: {error.message}</Text>}
      {Boolean(data) && <Text>{JSON.stringify(data, null, 2)}</Text>}
      <SignOutButton/>
    </View>
  )
}