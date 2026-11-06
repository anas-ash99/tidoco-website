import '@testing-library/jest-dom/vitest';
import zlib from 'node:zlib';

// Polyfill createZstdDecompress for Node environments < 22.12 where undici 7+ requires it
if (typeof (zlib as any).createZstdDecompress !== 'function') {
  (zlib as any).createZstdDecompress = () => {
    throw new Error('zstd is not supported in this Node version');
  };
}
