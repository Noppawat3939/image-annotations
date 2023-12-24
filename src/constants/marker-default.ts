export const COLOR = {
  RED: "#B31312",
  BLUE: "#3559E0",
  GREEN: "#65B741",
  ORANGE: "#E36414",
  BLACK: "#000000",
  PINK: "#FF90BC",
  YELLOW: "#F4E869",
} as const;

export const MARKER_DEFAULT_VALUES = {
  COLORS: [
    COLOR.RED,
    COLOR.BLUE,
    COLOR.GREEN,
    COLOR.ORANGE,
    COLOR.BLACK,
    COLOR.PINK,
    COLOR.YELLOW,
  ],
  STROKE_WIDTH: 5,
};

export const MARKER_SYMBOL = {
  SQUARE: "FrameMarker",
  ARROW: "ArrowMarker",
  CIRCLE_OUTLINE: "EllipseFrameMarker",
} as const;
