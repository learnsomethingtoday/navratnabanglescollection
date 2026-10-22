import { describe, expect, it, vi } from 'vitest';
import { preloadAdjacentImages, revealGalleryImage, type GalleryImage } from '../src/lib/card-gallery';

const createImage = (hidden: boolean, decode: () => Promise<void>): GalleryImage => ({
  hidden,
  loading: 'lazy',
  decode,
});

describe('catalogue card gallery loading', () => {
  it('keeps the current image visible until the selected image has decoded', async () => {
    let finishDecode: (() => void) | undefined;
    const pendingDecode = new Promise<void>((resolve) => {
      finishDecode = resolve;
    });
    const current = createImage(false, vi.fn().mockResolvedValue(undefined));
    const target = createImage(true, vi.fn(() => pendingDecode));

    const selection = revealGalleryImage([current, target], 1);

    expect(current.hidden).toBe(false);
    expect(target.hidden).toBe(true);
    expect(target.loading).toBe('eager');

    finishDecode?.();
    await selection;

    expect(current.hidden).toBe(true);
    expect(target.hidden).toBe(false);
  });

  it('preloads only the neighbouring images around the current image', () => {
    const images = Array.from({ length: 4 }, (_, index) =>
      createImage(index !== 0, vi.fn().mockResolvedValue(undefined)),
    );

    preloadAdjacentImages(images, 0);

    expect(images.map((image) => image.loading)).toEqual(['lazy', 'eager', 'lazy', 'eager']);
    expect(images.map((image) => vi.mocked(image.decode).mock.calls.length)).toEqual([0, 1, 0, 1]);
  });
});
