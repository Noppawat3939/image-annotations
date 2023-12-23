"use client";

import { useEffect } from "react";
import {
  ColorPickerPanel,
  RectangularBoxMarkerBase,
  SvgHelper,
} from "markerjs2";

const TriangleMarker = () => {
  //   const { container, overlayContainer, settings } = props;

  //   useEffect(() => {
  //     const strokeColor = settings.defaultColor;
  //     const strokeWidth = settings.defaultStrokeWidth;

  //     const getPoints = () => `0,${height} ${width / 2},0 ${width},${height}`;

  //     const createVisual = () => {
  //       const visual = SvgHelper.createPolygon(getPoints(), [
  //         ["stroke", strokeColor],
  //         ["fill", "transparent"],
  //         ["stroke-width", strokeWidth.toString()],
  //       ]);
  //       addMarkerVisualToContainer(visual);
  //     };

  //     const setPoints = () => {
  //       setSize();
  //       SvgHelper.setAttributes(visual, [["points", getPoints()]]);
  //     };

  //     const setStrokeColor = (color) => {
  //       strokeColor = color;
  //       if (visual) {
  //         SvgHelper.setAttributes(visual, [["stroke", strokeColor]]);
  //       }
  //     };

  //     // Rest of the methods...

  //     const strokePanel = new ColorPickerPanel(
  //       "Line color",
  //       settings.defaultColorSet,
  //       settings.defaultColor
  //     );
  //     strokePanel.onColorChanged = setStrokeColor;

  //     const ownsTarget = (el) => {
  //       if (ownsTarget(el) || el === visual) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };

  //     const toolboxPanels = () => [strokePanel];

  //     const getState = () => {
  //       const result = Object.assign(
  //         {
  //           strokeColor: strokeColor,
  //         },
  //         getState()
  //       );
  //       result.typeName = TriangleMarker.typeName;

  //       return result;
  //     };

  //     const restoreState = (state) => {
  //       const rectState = state;
  //       strokeColor = rectState.strokeColor;

  //       createVisual();
  //       restoreState(state);
  //       setPoints();
  //     };

  //     const scale = (scaleX, scaleY) => {
  //       scale(scaleX, scaleY);
  //       setPoints();
  //     };

  //     const triangleMarker = {
  //       getPoints,
  //       createVisual,
  //       setPoints,
  //       setStrokeColor,
  //       // Include other methods here...
  //     };

  //     triangleMarker.typeName = "TriangleMarker";
  //     triangleMarker.title = "Triangle marker";
  //     triangleMarker.icon = `<svg viewBox="0 0 24 24"><path d="M12,2L1,21H23M12,6L19.53,19H4.47" /></svg>`;

  //     // Usage of triangleMarker object as needed

  //     return () => {
  //       // Cleanup or removal of listeners if necessary
  //     };
  //   }, [container, overlayContainer, settings]);

  return null;
};

export default TriangleMarker;
