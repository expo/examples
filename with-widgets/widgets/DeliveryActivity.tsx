import { Capsule, HStack, Image, ProgressView, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import {
  clipShape,
  containerBackground,
  font,
  foregroundStyle,
  frame,
  labelsHidden,
  lineLimit,
  ModifierConfig,
  monospacedDigit,
  multilineTextAlignment,
  padding,
  progressViewStyle,
  resizable,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import { createLiveActivity, type LiveActivityEnvironment } from 'expo-widgets';
import type { SFSymbol } from 'sf-symbols-typescript';

export type DeliveryProps = {
  orderId: string;
  status: string; // 'Preparing' | 'On the way' | 'Delivered'
  stage: number; // 0..2
  // Props are JSON-serialized across the bridge, so pass epoch ms (not Date
  // objects) and rebuild the Dates inside the widget.
  startEpochMs: number;
  etaEpochMs: number;
  logoUri?: string;
};

// Layout helpers must live *inside* this function: the `'widget'` directive
// serializes only the function body into the widget's separate JS runtime.
const DeliveryActivity = (props: DeliveryProps, _env: LiveActivityEnvironment) => {
  'widget';
  const TOTAL_STAGES = 3;
  const ACCENT = '#58BEF6';
  const DIM = '#FFFFFF40';
  // SF Symbols for each delivery step, shown in the expanded stepper.
  const STEP_ICONS = ['bag.fill', 'box.truck.fill', 'house.fill'] as const;
  // Rebuild the Dates from the epoch ms passed across the bridge.
  const startDate = new Date(props.startEpochMs);
  const etaDate = new Date(props.etaEpochMs);

  // Shared app-group image (copied into widgetsDirectory by the app).
  const Logo = ({ uri, size, modifiers }: { uri?: string; size?: number, modifiers?: ModifierConfig[] }) =>
    uri ? (
      <Image
        uiImage={uri}
        modifiers={[resizable(), frame({ width: size ?? 16, height: (size ?? 16) * 0.875 }), ...(modifiers ?? [])]}
      />
    ) : null;

  // Stepped progress bar: SF Symbol milestones joined by connectors that fill on
  // their own. Each connector is a ProgressView with a `timerInterval` for its
  // slice of the [start, eta] window (countsDown: false → fills); `labelsHidden`
  // hides the built-in timer text. A DIM Capsule sits behind each bar so the
  // unfilled track reads muted — a linear ProgressView's track isn't recolorable,
  // but it's translucent enough for the Capsule to show through. `accent` is white
  // on the banner's blue gradient, the blue ACCENT on the dark island.
  const StepProgress = ({ stage, accent = ACCENT }: { stage: number; accent?: string }) => {
    // 3 stages -> 2 connectors, each spanning an equal slice of the window.
    const segMs = (props.etaEpochMs - props.startEpochMs) / (TOTAL_STAGES - 1);
    const cells = STEP_ICONS.flatMap((icon, i) => {
      const step = <Image key={`s${i}`} systemName={icon} size={16} color="#FFFFFF" />;
      if (i === STEP_ICONS.length - 1) return [step];
      const connector = (
        <ZStack key={`l${i}`} modifiers={[frame({ maxWidth: Infinity })]}>
          <Capsule modifiers={[foregroundStyle(DIM), frame({ height: 4, maxWidth: Infinity })]} />
          <ProgressView
            timerInterval={{
              lower: new Date(props.startEpochMs + i * segMs),
              upper: new Date(props.startEpochMs + (i + 1) * segMs),
            }}
            countsDown={false}
            modifiers={[
              progressViewStyle('linear'),
              // Finished connectors go white (like the icons); the filling one is accent.
              tint(stage > i ? '#FFFFFF' : accent),
              labelsHidden(),
              frame({ maxWidth: Infinity }),
            ]}
          />
        </ZStack>
      );
      return [step, connector];
    });
    return (
      <HStack spacing={8} modifiers={[frame({ maxWidth: Infinity })]}>
        {cells}
      </HStack>
    );
  };

  // Live countdown that updates on its own. A bounded `timerInterval` clamps at
  // 0:00 (the `.timer` date style would count back up past the deadline); it swaps
  // to a static label/icon once delivered. Timer text is greedy, so a fixed-width
  // `frame` + `monospacedDigit` keep it from overflowing its region.
  const Eta = ({
    start,
    end,
    stage,
    size,
    color,
    width,
    deliveredLabel = 'Delivered',
    deliveredIcon,
  }: {
    start: Date;
    end: Date;
    stage: number;
    size: number;
    color: string;
    width: number;
    deliveredLabel?: string;
    // SF Symbol shown instead of the label once delivered (for the tiny compact region).
    deliveredIcon?: SFSymbol;
  }) =>
    stage >= TOTAL_STAGES - 1 ? (
      deliveredIcon ? (
        // Larger than the countdown text it replaces, so it reads in the compact region.
        <Image systemName={deliveredIcon} size={Math.round(size * 1.6)} color={color} />
      ) : (
        <Text modifiers={[font({ weight: 'medium', size }), foregroundStyle(color)]}>
          {deliveredLabel}
        </Text>
      )
    ) : (
      <Text
        timerInterval={{ lower: start, upper: end }}
        countsDown
        modifiers={[
          font({ weight: 'medium', size }),
          monospacedDigit(),
          foregroundStyle(color),
          multilineTextAlignment('trailing'),
          frame({ width, alignment: 'trailing' }),
        ]}
      />
    );

  const statusLine = (p: DeliveryProps) =>
    ['Packing your order now', 'Your order is on the way', 'Delivered — enjoy!'][p.stage] ?? p.status;

  return {
    // Lock screen / Notification Center banner.
    banner: (
      <ZStack
        modifiers={[containerBackground('#000000', 'widget'), clipShape('containerRelativeShape')]}>

        <VStack
          alignment="leading"
          spacing={12}
          modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' }), padding({ all: 16 })]}>
          <HStack spacing={8}>
            <Logo uri={props.logoUri} />
            <Text modifiers={[font({ weight: 'medium', size: 13 }), foregroundStyle('#FFFFFF')]}>
              Expo Starter
            </Text>
            <Spacer />
            <HStack spacing={4}>
              <Eta start={startDate} end={etaDate} stage={props.stage} size={13} color="#FFFFFFCC" width={48} />
            </HStack>
          </HStack>
          <Text modifiers={[font({ weight: 'bold', size: 18 }), foregroundStyle('#FFFFFF')]}>
            {props.status}
          </Text>
          <StepProgress stage={props.stage} accent="#FFFFFF" />
        </VStack>
      </ZStack>
    ),
    // Dynamic Island compact — leading = logo, trailing = ETA.
    compactLeading: <Logo uri={props.logoUri} size={14} modifiers={[padding({ leading: 4 })]} />,
    compactTrailing: (
      <Eta start={startDate} end={etaDate} stage={props.stage} size={13} color="#FFFFFF" width={46} deliveredIcon="checkmark.circle.fill" />
    ),
    // Minimal — just the logo in the tiny minimal region.
    minimal: <Logo uri={props.logoUri} size={16} />,
    // Expanded — logo (top-left), ETA (top-right), progress bar across the bottom.
    expandedLeading: (
      <HStack spacing={6} modifiers={[padding({ leading: 8 })]}>
        <Logo uri={props.logoUri} />
        <Text modifiers={[font({ weight: 'semibold', size: 14 }), foregroundStyle('#FFFFFF'), lineLimit(1)]}>
          Starter
        </Text>
      </HStack>
    ),
    expandedTrailing: (
      <HStack modifiers={[padding({ trailing: 6 })]}>
        <Eta start={startDate} end={etaDate} stage={props.stage} size={14} color={ACCENT} width={52} />
      </HStack>
    ),
    expandedBottom: (
      <VStack alignment="leading" spacing={10} modifiers={[padding({ top: 4, horizontal: 6 })]}>
        <Text modifiers={[font({ size: 13 }), foregroundStyle('#FFFFFFCC')]}>{statusLine(props)}</Text>
        <StepProgress stage={props.stage} />
      </VStack>
    ),
  };
};

export default createLiveActivity<DeliveryProps>('DeliveryActivity', DeliveryActivity);
