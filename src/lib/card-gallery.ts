export type GalleryImage = Pick<HTMLImageElement, 'hidden' | 'loading' | 'decode'>;

const normalizeIndex = (index: number, length: number): number =>
  ((index % length) + length) % length;

const preloadImage = (image: GalleryImage): void => {
  image.loading = 'eager';
  void image.decode().catch(() => undefined);
};

export const preloadAdjacentImages = (images: GalleryImage[], currentIndex: number): void => {
  if (images.length < 2) return;

  const adjacentIndexes = new Set([
    normalizeIndex(currentIndex - 1, images.length),
    normalizeIndex(currentIndex + 1, images.length),
  ]);

  adjacentIndexes.forEach((index) => preloadImage(images[index]));
};

export const revealGalleryImage = async (
  images: GalleryImage[],
  targetIndex: number,
): Promise<number> => {
  if (images.length === 0) return -1;

  const selectedIndex = normalizeIndex(targetIndex, images.length);
  const selectedImage = images[selectedIndex];
  selectedImage.loading = 'eager';

  try {
    await selectedImage.decode();
  } catch {
    // A failed decode should not leave gallery navigation unusable. The
    // browser may still be able to display the image through normal loading.
  }

  images.forEach((image, index) => {
    image.hidden = index !== selectedIndex;
  });

  return selectedIndex;
};
