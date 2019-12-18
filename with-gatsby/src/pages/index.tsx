import { Link } from "gatsby";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useREM from "../hooks/useREM";
import Constants from "expo-constants";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ExternalLink from "../components/externalLink";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Text
        style={[styles.header, { fontSize: useREM(2.25) }]}
        accessibilityRole="header"
      >
        Hi people
      </Text>
      <Text style={styles.paragraph}>
        Welcome to this Gatsby site, rendering React Native Web, and using Expo
        crossplatform APIs (unimodules). It's a bit new and experimental but
        gives you an idea of what the future might look like :)
      </Text>
      <Text style={styles.paragraph}>
        You can try to turn JS off and refresh the pages, and they should render
        ;)
      </Text>
      <Text style={styles.paragraph}>ExpoVersion={Constants.expoVersion}</Text>
      <View style={{ marginBottom: `2.45rem` }} />
      <View style={{ marginBottom: `1.45rem` }}>
        <Text style={styles.header}>Useful links:</Text>
        <ExternalLink
          href={"https://github.com/slorber/gatsby-plugin-react-native-web"}
        >
          gatsby-plugin-react-native-web (v3-beta with Expo support)
        </ExternalLink>
        <ExternalLink
          href={"https://github.com/expo/examples/tree/master/with-gatsby"}
        >
          This example's source code
        </ExternalLink>
      </View>

      <View style={{ marginBottom: `1.45rem` }}>
        <Text style={styles.header}>Authors:</Text>
        <ExternalLink href={"https://twitter.com/Baconbrix"}>
          @Baconbrix
        </ExternalLink>
        <ExternalLink href={"https://twitter.com/sebastienlorber"}>
          @Sebastienlorber
        </ExternalLink>
      </View>

      <View style={{ marginBottom: `2.45rem` }} />
      <Link to="/expo" style={{ color: "blue", fontSize: 40 }}>
        Browser Expo examples now!!!
      </Link>
      <View style={{ marginBottom: `4.45rem` }} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    marginBottom: 15
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 16
  }
});

export default IndexPage;
