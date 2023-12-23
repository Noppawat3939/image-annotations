import { COLOR } from "@/constants";
import { ConditionKey } from "@/types";
import { type MarkerBaseState } from "markerjs2";

export const mapConditionWithMarkerState = (_key: ConditionKey) => {
  const mapKeyWithMarker = {
    scratch: {
      typeName: "FrameMarker",
      color: COLOR.RED,
    },
    screen_scratch: {
      typeName: "FrameMarker",
      color: COLOR.BLUE,
    },
    screen_dent: {
      typeName: "FrameMarker",
      color: COLOR.GREEN,
    },
    dent: {
      typeName: "FrameMarker",
      color: COLOR.ORANGE,
    },
    screen_cracked: {
      typeName: "EllipseFrameMarker",
      color: COLOR.RED,
    },
    back_glass_cracked: {
      typeName: "EllipseFrameMarker",
      color: COLOR.ORANGE,
    },
    back_camera_crack: {
      typeName: "EllipseFrameMarker",
      color: COLOR.BLUE,
    },
    pixel_white: {
      typeName: "ArrowMarker",
      color: COLOR.RED,
    },
    pixel_black: {
      typeName: "ArrowMarker",
      color: COLOR.BLUE,
    },
  } as Record<typeof _key, MarkerBaseState & { color: string }>;

  return mapKeyWithMarker[_key];
};

export const findMarkerWithCondition = (
  markers: MarkerBaseState[],
  condition: ConditionKey
) => {
  const mapped = mapConditionWithMarkerState(condition);

  const found = markers.filter(
    (marker) =>
      marker?.typeName === mapped?.typeName &&
      (marker as MarkerBaseState & { strokeColor?: string })?.strokeColor ===
        mapped.color
  );

  return found;
};
