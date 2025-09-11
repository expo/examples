import { type Href, Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { type ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as Href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== "web") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(href as string, {
            presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}
