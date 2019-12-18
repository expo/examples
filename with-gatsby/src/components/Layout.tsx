/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";

import Header from "./header";

const Anchor = (props: any) => {
  return <Text accessibilityRole="link" {...props} />;
};

const Layout = ({
  children,
}: {
  children: ReactNode;
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description  
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} siteDescription={data.site.siteMetadata.description}/>
      <View
        style={{
          marginHorizontal: `auto`,
          maxWidth: 960,
          paddingBottom: `1.0875rem`,
          paddingHorizontal: `1.45rem`,
          paddingTop: 0
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
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
