import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { useQuery, gql } from '@apollo/client';

const GET_TWEET = gql`
  query {
    twitter {
      tweet(id: "1261034643710775299") {
        text
        user {
          name
          screen_name
          profile_image_url
        }
      }
    }
  }
`

const RootComponent = () => {
  const { data, loading, error } = useQuery(GET_TWEET);

  if (error) console.error('error', error)
  if (loading) return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </SafeAreaView>
  )
  const { tweet } = data.twitter;
  const { user } = tweet;
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 50 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: user.profile_image_url }}
          style={{ height: 50, width: 50, borderRadius: 100 }}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {user.name}
          </Text>
          <Text style={{ color: 'gray' }}>
            @{user.screen_name}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16 }}>
          {tweet.text}
        </Text>
      </View>
    </View>
  )
}

export default RootComponent;
