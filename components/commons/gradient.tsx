import { StyleSheet, ViewStyle, Text, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';

interface GradientBackgroundProps {
  children?: React.ReactNode|React.JSX.Element;
  style?: ViewStyle;
  colors?: string[]
}

const mainColors = [
    'rgb(60, 195, 150)',  // Sea green
    'rgb(60, 182, 195)'  // Turquoise
]
export const GradientBackground: React.FC<GradientBackgroundProps> = ({ children, style, colors = mainColors }) => {
  return (
    <LinearGradient
      colors={colors as any}
      start={{ x: 0.2, y: 0.4 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};


// Types for different gradient variations
type GradientDirection = 'horizontal' | 'vertical' | 'diagonal';
type GradientPreset = 'default' | 'reversed' | 'spaced';

interface GradientTextProps {
  children: React.ReactNode|React.JSX.Element;
  style?: TextStyle;
  direction?: GradientDirection;
  preset?: GradientPreset;
  colors?: string[];
}

// Your specific gradient presets
const gradientPresets = {
  default: ['rgb(60, 195, 150)', 'rgb(60, 182, 195)'],
  reversed: ['rgb(60, 182, 195)', 'rgb(60, 195, 150)'],
  spaced: ['rgb(60, 195, 150)', 'rgb(60, 189, 172)', 'rgb(60, 182, 195)']
};

// Gradient direction configurations
const gradientDirections = {
  horizontal: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  vertical: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  diagonal: { start: { x: 0.2, y: 0.4 }, end: { x: 1, y: 1 } },
};

// Memoized base gradient text component
export const BaseGradientText = memo<GradientTextProps>(({ 
  children, 
  style, 
  direction = 'diagonal',
  preset = 'default',
  colors: customColors,
}) => {
  const colors = customColors || gradientPresets[preset];
  const { start, end } = gradientDirections[direction];

  return (
    <MaskedView
      maskElement={
        <Text style={[styles.text, style]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors as any}
        start={start}
        end={end}
        style={styles.gradient}
      >
        <Text style={[styles.text, style, styles.transparentText]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
});

// Optimized preset components
export const GradientHeading = memo<Omit<GradientTextProps, 'preset'>>((props) => (
  <BaseGradientText {...props} style={[styles.heading, props.style] as any} />
));

export const GradientTitle = memo<Omit<GradientTextProps, 'preset'>>((props) => (
  <BaseGradientText {...props} style={[styles.title, props.style] as any} />
));

export const GradientSubheading = memo<Omit<GradientTextProps, 'preset'>>((props) => (
  <BaseGradientText {...props} style={[styles.subheading, props.style] as any} />
));






type GradientPresetIG = 'stories' | 'message' | 'live' | 'create' | 'sunset' | 'purple';

interface InstagramGradientProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  preset?: GradientPresetIG;
  colors?: string[];
}

// Instagram's common gradient presets
const gradientPresetsIG = {
  stories: ['#FBC147', '#F65E8E', '#833AB4'], // Yellow to Pink to Purple
  message: ['#5851DB', '#833AB4', '#C13584'], // Purple to Magenta
  live: ['#DD2A7B', '#8134AF', '#515BD4'], // Pink to Purple to Blue
  create: ['#405DE6', '#5851DB', '#833AB4'], // Blue to Purple
  sunset: ['#FCB045', '#FD1D1D', '#833AB4'], // Yellow to Red to Purple
  purple: ['#8B3DFF', '#833AB4', '#C13584'], // Purple variations
};

// Base gradient angles
const baseAngles = {
  stories: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  message: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  live: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  create: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  sunset: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  purple: { start: { x: 0.1, y: 0.1 }, end: { x: 0.9, y: 0.9 } },
};

const InstagramGradient = memo<InstagramGradientProps>(({ 
  children, 
  style, 
  preset = 'stories',
  colors: customColors,
}) => {
  const colors = customColors || gradientPresetsIG[preset];
  const { start, end } = baseAngles[preset];

  return (
    <LinearGradient
      colors={colors as any}
      start={start}
      end={end}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
});

// Specific use-case components
export const StoryGradient = memo<Omit<InstagramGradientProps, 'preset'>>((props) => (
  <InstagramGradient {...props} preset="stories" style={[styles.storyRing, props.style] as any}>
    {props.children}
  </InstagramGradient>
));

export const MessageGradient = memo<Omit<InstagramGradientProps, 'preset'>>((props) => (
  <InstagramGradient {...props} preset="message" style={[styles.messageBubble, props.style] as any}>
    {props.children}
  </InstagramGradient>
));

export const LiveBadgeGradient = memo<Omit<InstagramGradientProps, 'preset'>>((props) => (
  <InstagramGradient {...props} preset="live" style={[styles.liveBadge, props.style] as any}>
    {props.children}
  </InstagramGradient>
));








const styles = StyleSheet.create({
  gradient: {
    // flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  transparentText: {
    opacity: 0,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  storyRing: {
    borderRadius: 1000,
    padding: 3,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 12,
  },
  liveBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

