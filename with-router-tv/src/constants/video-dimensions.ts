export function videoDimensions(screenDimensions: {
  width: number;
  height: number;
}) {
  const aspectRatio = 1.8;
  const scale = 0.5;
  const { width, height } = screenDimensions;
  const videoWidth = Math.min(width, height * aspectRatio) * scale;
  const videoHeight = Math.min(height, width / aspectRatio) * scale;
  return {
    videoWidth,
    videoHeight,
  };
}
