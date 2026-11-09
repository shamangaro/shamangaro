export const ETENDOIR_PRODUCT = {
  slug: "etendoir-mural",
  name: "مجفف ملابس جداري",
  unitPrice: 349,
  sourcePage: "/products/etendoir-mural",
} as const;

export const ETENDOIR_OFFERS = [
  { quantity: 1, total: 349 },
  { quantity: 2, total: 599 },
  { quantity: 3, total: 799 },
] as const;

export type EtendoirQuantity = (typeof ETENDOIR_OFFERS)[number]["quantity"];

/**
 * Gallery files live in /public/images/etendoir-mural/.
 * Replace the files with supplier photos of this same rack, or point `src`
 * at the new files. Do not add marketplace screenshots, logos, prices, or listing text.
 */
export const ETENDOIR_GALLERY = [
  {
    id: "hang",
    src: "/images/etendoir-mural/hang-clothes.jpg",
    width: 680,
    height: 680,
    frame: "aspect-[4/5]",
    crop: "object-left",
  },
  {
    id: "open",
    src: "/images/etendoir-mural/crop-open.png",
    width: 1000,
    height: 195,
    frame: "aspect-[5/2]",
    crop: "object-center",
  },
  {
    id: "folded",
    src: "/images/etendoir-mural/fold-closed.jpg",
    width: 680,
    height: 528,
    frame: "aspect-[3/2]",
    crop: "object-[18%_24%]",
  },
] as const;

export type EtendoirImageId = (typeof ETENDOIR_GALLERY)[number]["id"];

export const ETENDOIR_CITIES = [
  { value: "الدار البيضاء", fr: "Casablanca", ar: "الدار البيضاء" },
  { value: "الرباط", fr: "Rabat", ar: "الرباط" },
  { value: "مراكش", fr: "Marrakech", ar: "مراكش" },
  { value: "فاس", fr: "Fès", ar: "فاس" },
  { value: "طنجة", fr: "Tanger", ar: "طنجة" },
  { value: "أكادير", fr: "Agadir", ar: "أكادير" },
  { value: "مكناس", fr: "Meknès", ar: "مكناس" },
  { value: "وجدة", fr: "Oujda", ar: "وجدة" },
  { value: "القنيطرة", fr: "Kénitra", ar: "القنيطرة" },
  { value: "تطوان", fr: "Tétouan", ar: "تطوان" },
  { value: "تمارة", fr: "Témara", ar: "تمارة" },
  { value: "سلا", fr: "Salé", ar: "سلا" },
  { value: "الجديدة", fr: "El Jadida", ar: "الجديدة" },
  { value: "بني ملال", fr: "Béni Mellal", ar: "بني ملال" },
  { value: "خريبكة", fr: "Khouribga", ar: "خريبكة" },
  { value: "المحمدية", fr: "Mohammedia", ar: "المحمدية" },
  { value: "الناظور", fr: "Nador", ar: "الناظور" },
  { value: "سطات", fr: "Settat", ar: "سطات" },
  { value: "آسفي", fr: "Safi", ar: "آسفي" },
  { value: "العيون", fr: "Laâyoune", ar: "العيون" },
] as const;
