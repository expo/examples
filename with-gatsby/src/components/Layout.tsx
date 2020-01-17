/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

import Header from './header';

const Anchor = (props: any) => {
  return <Text accessibilityRole="link" {...props} />
}

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <View
        style={{
          marginHorizontal: `auto`,
          maxWidth: 960,
          paddingBottom: `1.0875rem`,
          paddingHorizontal: `1.45rem`,
          paddingTop: 0,
        }}
      >
        <View accessibilityRole="summary">{children}</View>
        <Text>
          © {new Date().getFullYear()}, Built with
          {` `}
          <Anchor href="https://www.gatsbyjs.org">Gatsby</Anchor>
        </Text>
      </View>
    </>
  )
}

export default Layout
