import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, CircleProps } from 'react-native-svg';
import { useTheme } from '@/theme/Theme';

interface StoryRingProps {
  size?: number;
  segments?: number;
  spacing?: number;
  imageUrl?: ImageSourcePropType;
  strokeWidth?: number;
  style?: ViewStyle;
  seen?: boolean;
  gradientColors?: string[];
  children?:React.ReactElement
}

export const StoryRing = memo<StoryRingProps>(({
  size = 80,
  segments = 1,
  spacing = 4,
  imageUrl,
  strokeWidth = 2,
  style,
  seen = false,
  gradientColors = ['#FBC147', '#F65E8E', '#833AB4'], // Default Instagram-like gradient
  children
}) => {

  const {colors} = useTheme()
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = (circumference - (spacing * segments)) / segments;
  const center = size / 2;

  // Calculate segment positions
  const getSegmentProps = (index: number): CircleProps => {
    const rotation = (360 / segments) * index;
    const dashArray = [segmentLength, spacing];
    const dashOffset = -index * (segmentLength + spacing);

    return {
      r: radius,
      cx: center,
      cy: center,
      originX: center,
      originY: center,
      strokeWidth: 0,
      stroke: colors.background, // seen ? '#8E8E8E' : 'url(#gradient)',
      fill: 'none',
      strokeDasharray: dashArray.join(' '),
      strokeDashoffset: dashOffset,
      transform: `rotate(${rotation}, ${center}, ${center})`,
    };
  };

  return (
    <View style={[{ width: size, height: size }, style]}>
      <LinearGradient
        colors={gradientColors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.innerContent}>
          <Svg height={size} width={size}>
            {Array.from({ length: segments }).map((_, index) => (
              <Circle key={index} {...getSegmentProps(index)} />
            ))}
          </Svg>
          <View style={styles.imageContainer}>
            {/* <Image
              source={imageUrl}
              style={styles.image}
            /> */}
            {children}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});

// Specific preset components
export const InstagramStoryRing = memo<Omit<StoryRingProps, 'gradientColors'>>((props) => (
  <StoryRing
    {...props}
    gradientColors={['#FBC147', '#F65E8E', '#833AB4']}
  />
));

export const WhatsAppStoryRing = memo<Omit<StoryRingProps, 'gradientColors'>>((props) => (
  <StoryRing
    {...props}
    gradientColors={['#25D366', '#128C7E', '#075E54']}
  />
));

export const AppStoryRing = memo<Omit<StoryRingProps, 'gradientColors'>>((props) => (
    <StoryRing
      {...props}
      gradientColors={['rgb(60, 195, 150)', '#128C7E', 'rgb(60, 182, 195)']}
    />
  ));

const styles = StyleSheet.create({
  gradientContainer: {
    // width: '100%',
    // height: '100%',
    borderRadius: 1000,
    padding: 2,
  },
  innerContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },
});
