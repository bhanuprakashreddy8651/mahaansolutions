// Generate small-browser and home-screen fallbacks from the same vector master.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

async function build() {
  const source = path.join(__dirname, '../public/icon.svg');
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  images.forEach((png, index) => {
    const position = 6 + index * 16;
    header[position] = sizes[index];
    header[position + 1] = sizes[index];
    header.writeUInt16LE(1, position + 4);
    header.writeUInt16LE(32, position + 6);
    header.writeUInt32LE(png.length, position + 8);
    header.writeUInt32LE(offset, position + 12);
    offset += png.length;
  });
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), Buffer.concat([header, ...images]));
  await sharp(source).resize(180, 180).png().toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(source).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon-192.png'));
  await sharp(source).resize(512, 512).png().toFile(path.join(__dirname, '../public/icon-512.png'));
  console.log('Built favicon.ico (16/32/48), Apple touch icon, and 192/512px brand icons.');
}
build().catch(error => { console.error(error); process.exitCode = 1; });
