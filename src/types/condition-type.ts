export type ConditionFilter = { key: ConditionKey; label: string };

export type ConditionKey =
  | "scratch"
  | "screen_scratch"
  | "screen_dent"
  | "dent"
  | "screen_cracked"
  | "back_glass_cracked"
  | "back_camera_crack"
  | "pixel_white"
  | "pixel_black"
  | "pink_burn"
  | "yellow_burn"
  | "overlay_burn";
