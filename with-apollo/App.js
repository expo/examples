import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { ApolloProvider, useQuery, gql } from '@apollo/client';

import { apolloClient } from './apollo';

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

function RootComponent() {
  const { data, loading, error } = useQuery(GET_TWEET);

  if (error) { console.error('error', error) };
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  };
  const { tweet } = data.twitter;
  const { user } = tweet;
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user.profile_image_url }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.name}>
            {user.name}
          </Text>
          <Text style={styles.username}>
            @{user.screen_name}
          </Text>
        </View>
      </View>
      <View style={styles.tweetContainer}>
        <Text style={styles.tweet}>
          {tweet.text}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  details: {
    marginLeft: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  username: {
    color: 'gray'
  },
  tweetContainer: {
    marginTop: 10
  },
  tweet: {
    fontSize: 16
  }
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootComponent />
    </ApolloProvider>
  );
}
