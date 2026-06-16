import { HStack, Image, Rectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  clipShape,
  containerBackground,
  font,
  foregroundStyle,
  frame,
  offset,
  padding,
  resizable,
  scaleEffect,
  zIndex
} from '@expo/ui/swift-ui/modifiers';
import { createWidget, type WidgetEnvironment } from 'expo-widgets';

type CounterWidgetProps = {
  count: number;
  logoUri?: string;
  gridUri?: string;
};

const CounterWidget = (props: CounterWidgetProps, environment: WidgetEnvironment) => {
  'widget';
  // Only show the full-color background in fullColor mode (or if undefined).
  const isFullColor =
    environment.widgetRenderingMode == null || environment.widgetRenderingMode === 'fullColor';
  return (
    <ZStack
      alignment="leading"
      modifiers={[containerBackground('#000000', 'widget'), clipShape('containerRelativeShape')]}>


      <ZStack
        alignment="bottomTrailing"
        modifiers={[
          frame({ maxWidth: Infinity, maxHeight: Infinity }),
          clipShape('containerRelativeShape'),
          zIndex(0),
        ]}>
        {isFullColor && (
          <Rectangle
            modifiers={[
              foregroundStyle({
                type: 'linearGradient',
                colors: ['#58BEF6', '#366DF2'],
                startPoint: { x: 0.5, y: 0 },
                endPoint: { x: 0.5, y: 1 },
              }),
              frame({ maxWidth: Infinity, maxHeight: Infinity }),
            ]}
          />
        )}

        {props.gridUri && (
          <Image
            uiImage={props.gridUri}
            modifiers={[
              resizable(),
              frame({ width: 150, height: 150 }),
              scaleEffect(3),
              offset({ x: 0, y: 100 }),
            ]}
          />
        )}
      </ZStack>

      <VStack
        alignment="leading"

        spacing={4}
        modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' }), padding({ all: 16 }), zIndex(3)]}>
        <HStack spacing={16}>
          {props.logoUri && (
            <Image
              uiImage={props.logoUri}
              modifiers={[resizable(), frame({ width: 16, height: 14 })]}

            />
          )}
          <Text modifiers={[font({ weight: 'medium', size: 12 }), foregroundStyle('#FFFFFF')]}>
            Expo Starter
          </Text>
        </HStack>
        <Spacer />
        {environment.widgetFamily === 'systemSmall' ? (
          <Text modifiers={[font({ weight: 'medium', size: 40 }), foregroundStyle('#FFFFFF')]}>
            {props.count}
          </Text>
        ) : (
          <Text modifiers={[font({ weight: 'medium', size: 20 }), foregroundStyle('#FFFFFF')]}>
            Count: {props.count}
          </Text>
        )}
        <Text modifiers={[font({ weight: 'medium', size: 12 }), foregroundStyle('#FFFFFF')]}>
          Family: {environment.widgetFamily}
        </Text>
      </VStack>
    </ZStack>
  );
};

export default createWidget('CounterWidget', CounterWidget);
