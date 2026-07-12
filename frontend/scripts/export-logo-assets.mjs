import sharp from "sharp";
import path from "node:path";

const SOURCE =
  "C:/Users/mabrchaouen/.cursor/projects/c-Users-mabrchaouen-Projects-shamangaro/assets/c__Users_mabrchaouen_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_B527C4FB-5C97-4E1D-8DC6-762C63494128-daecffbc-7aad-45e1-98d0-bbeba23ff65f.png";

const WORDMARK_OUT = path.resolve("public/images/logo-shamangaro.png");
const ICON_OUT = path.resolve("public/images/logo-icon.png");

function makeBlackTransparent(data, threshold = 24) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }
}

async function exportWordmark() {
  const img = sharp(SOURCE);
  const meta = await img.metadata();

  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  makeBlackTransparent(data, 8);

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(WORDMARK_OUT);

  const outMeta = await sharp(WORDMARK_OUT).metadata();
  console.log("wordmark", outMeta);
  return outMeta;
}

async function exportIcon() {
  const img = sharp(SOURCE);
  const meta = await img.metadata();

  const left = Math.round(meta.width * 0.03);
  const top = Math.round(meta.height * 0.04);
  const width = Math.round(meta.width * 0.34);
  const height = Math.round(meta.height * 0.92);

  const { data, info } = await img
    .extract({ left, top, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  makeBlackTransparent(data);

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png()
    .toFile(ICON_OUT);

  const outMeta = await sharp(ICON_OUT).metadata();
  console.log("icon", outMeta);
  return outMeta;
}

async function main() {
  await exportWordmark();
  await exportIcon();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
