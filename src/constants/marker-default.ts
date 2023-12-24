export const COLOR = {
  RED: "#D80032",
  BLUE: "#39A7FF",
  GREEN: "#65B741",
  ORANGE: "#E36414",
  BLACK: "#000000",
  PINK: "#FF90BC",
  YELLOW: "#FFC436",
  RGBA: {
    PINK_40: "rgba(255,144,188,.4)",
    YELLOW_40: "rgba(255, 196, 54, .4)",
    RED_40: "rgba(216, 0, 50, .4)",
  },
} as const;

export const MARKER_SYMBOL = {
  SQUARE: "FrameMarker",
  ARROW: "ArrowMarker",
  CIRCLE: "EllipseFrameMarker",
  SQUARE_COVER: "CoverMarker",
} as const;
