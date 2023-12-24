import { COLOR, MARKER_SYMBOL } from "@/constants";
import { ConditionKey } from "@/types";
import { type MarkerBaseState } from "markerjs2";

export const mapConditionWithMarkerState = (_key: ConditionKey) => {
  const mapKeyWithMarker = {
    scratch: {
      typeName: MARKER_SYMBOL.SQUARE,
      color: COLOR.RED,
    },
    screen_scratch: {
      typeName: MARKER_SYMBOL.SQUARE,
      color: COLOR.BLUE,
    },
    screen_dent: {
      typeName: MARKER_SYMBOL.SQUARE,
      color: COLOR.GREEN,
    },
    dent: {
      typeName: MARKER_SYMBOL.SQUARE,
      color: COLOR.ORANGE,
    },
    screen_cracked: {
      typeName: MARKER_SYMBOL.CIRCLE_OUTLINE,
      color: COLOR.RED,
    },
    back_glass_cracked: {
      typeName: MARKER_SYMBOL.CIRCLE_OUTLINE,
      color: COLOR.ORANGE,
    },
    back_camera_crack: {
      typeName: MARKER_SYMBOL.CIRCLE_OUTLINE,
      color: COLOR.BLUE,
    },
    pixel_white: {
      typeName: MARKER_SYMBOL.ARROW,
      color: COLOR.RED,
    },
    pixel_black: {
      typeName: MARKER_SYMBOL.ARROW,
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
