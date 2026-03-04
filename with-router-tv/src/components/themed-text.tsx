import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'small'
    | 'smallBold'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const styles = useTextStyles();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const useTextStyles = () => {
  const { scale } = useScreenDimensions();
  return StyleSheet.create({
    small: {
      fontSize: 14 * scale,
      lineHeight: 20 * scale,
      fontWeight: 500,
    },
    smallBold: {
      fontSize: 14 * scale,
      lineHeight: 20 * scale,
      fontWeight: 700,
    },
    default: {
      fontSize: 16 * scale,
      lineHeight: 24 * scale,
      fontWeight: 500,
    },
    title: {
      fontSize: 48 * scale,
      fontWeight: 600,
      lineHeight: 52 * scale,
    },
    subtitle: {
      fontSize: 32 * scale,
      lineHeight: 44 * scale,
      fontWeight: 600,
    },
    link: {
      lineHeight: 30 * scale,
      fontSize: 14 * scale,
    },
    linkPrimary: {
      lineHeight: 30 * scale,
      fontSize: 14 * scale,
      color: '#3c87f7',
    },
    code: {
      fontFamily: Fonts.mono,
      fontWeight: Platform.select({ android: 700 }) ?? 500,
      fontSize: 12 * scale,
    },
  });
};
