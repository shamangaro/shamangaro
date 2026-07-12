import sharp from "sharp";
import path from "node:path";

const SOURCE =
  "C:/Users/mabrchaouen/.cursor/projects/c-Users-mabrchaouen-Projects-shamangaro/assets/c__Users_mabrchaouen_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_B527C4FB-5C97-4E1D-8DC6-762C63494128-daecffbc-7aad-45e1-98d0-bbeba23ff65f.png";

const OUT = path.resolve("public/images/logo-icon.png");

async function main() {
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

  const threshold = 24;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 1 })
    .png()
    .toFile(OUT);

  const outMeta = await sharp(OUT).metadata();
  console.log("output", outMeta);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
