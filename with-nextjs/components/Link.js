import { useRef } from 'react';
import { Linking, Text } from 'react-native';

export default function Link({ children, href = '#', onPress, ...props }) {
    const ref = useRef(null);

    return (
        <Text
            accessibilityRole="link"
            href={href}
            draggable={false}
            onPress={(event) => {
                Linking.openURL(href)
                if (onPress) onPress(event);
            }}
            tabIndex={0}
            ref={ref}
            {...props}>
            {children}
        </Text>
    );
}
