import { ConditionFilter } from "@/types";

export const conditionsFilter: ConditionFilter[] = [
  { label: "รอย", key: "scratch" },
  { label: "รอยหน้าจอ", key: "screen_scratch" },
  { label: "หน้าจอมีรอบบุบ", key: "screen_dent" },
  { label: "ความบุบ", key: "dent" },
  { label: "จอแตก", key: "screen_cracked" },
  { label: "กระจกหลังแตก", key: "back_glass_cracked" },
  { label: "กระจกกล้องหลังแตก", key: "back_camera_crack" },
  { label: "พิกเซลขาว", key: "pixel_white" },
  { label: "พิกเซลดำ หรือ สี", key: "pixel_black" },
  { label: "เบิร์นชมพู", key: "pink_burn" },
  { label: "เบิร์นเหลือง", key: "yellow_burn" },
  { label: "จอซ้อน", key: "overlay_burn" },
];
