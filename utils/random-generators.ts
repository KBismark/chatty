
// Base colors
const baseColors = [
  { r: 60, g: 175, b: 150 },  // First base color
  { r: 60, g: 172, b: 215 }   // Second base color
];


export function generateGradientColors(): [string, string] {
  
  // Generate two variations
  const color1 = generateVariation();
  const color2 = generateVariation();
  
  // Return as RGB strings
  return [
    `rgb(${color1[0]}, ${color1[1]}, ${color1[2]})`,
    `rgb(${color2[0]}, ${color2[1]}, ${color2[2]})`
  ];
}

// Function to ensure color values are within RGB range
const clamp = (value: number): number => Math.min(255, Math.max(0, value));

// Generate a variation based on randomly selected base color
const generateVariation = () => {
  // Randomly select one of the base colors
  const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
  
  // Random shift between -30 and 30 for each component
  const shiftR = Math.floor(Math.random() * 61) - 30;
  const shiftG = Math.floor(Math.random() * 61) - 30;
  const shiftB = Math.floor(Math.random() * 61) - 30;
  
  return [
    clamp(baseColor.r + shiftR),
    clamp(baseColor.g + shiftG),
    clamp(baseColor.b + shiftB)
  ];
};
