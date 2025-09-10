import { Link } from 'expo-router';
import * as Linking from 'expo-linking';
import type { Href } from 'expo-router';
import { type ComponentProps } from 'react';
import { Platform, Pressable } from 'react-native';

const openBrowserAsync =
  Platform.isTV && Platform.OS === 'ios'
    ? async () => {}
    : require('expo-web-browser').openBrowserAsync;

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

function ExternalLinkMobile({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href as Href}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}

function ExternalLinkTV({ href, ...rest }: Props) {
  return (
    <Pressable
      onPress={() =>
        Linking.openURL(href).catch((reason) => alert(`${reason}`))
      }
      style={({ pressed, focused }) => ({
        opacity: pressed || focused ? 0.6 : 1.0,
      })}
    >
      {rest.children}
    </Pressable>
  );
}

export function ExternalLink(props: Props) {
  return Platform.isTV ? ExternalLinkTV(props) : ExternalLinkMobile(props);
}
