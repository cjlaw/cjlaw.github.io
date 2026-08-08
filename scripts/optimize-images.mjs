import sharp from 'sharp';
import { readdir, mkdir, copyFile } from 'fs/promises';
import { join, extname } from 'path';

const SRC = 'src/img';
const DEST = 'assets/img';

await mkdir(DEST, { recursive: true });

const files = await readdir(SRC);
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!supported.has(ext)) continue;

  if (ext === '.svg') {
    await copyFile(join(SRC, file), join(DEST, file));
    console.log(`copied: ${file}`);
    continue;
  }

  const pipeline = sharp(join(SRC, file));

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline.jpeg({ quality: 85, progressive: true });
  } else if (ext === '.png') {
    pipeline.png({ compressionLevel: 8 });
  }

  await pipeline.toFile(join(DEST, file));
  console.log(`optimized: ${file}`);
}
