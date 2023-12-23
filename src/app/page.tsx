/* eslint-disable @next/next/no-img-element */
"use client";

import React, { type ChangeEvent, useRef, useState } from "react";
import * as markerJs from "markerjs2";
// import * as mjslive from "markerjs-live";
import { conditionsFilter } from "@/mapping";
import { COLOR, MARKER_DEFAULT_VALUES as MARKER_VALUES } from "@/constants";
import { ConditionKey } from "@/types";
import { findMarkerWithCondition } from "@/helper";

const MainPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>();

  const [markerState, setMarkerState] = useState<markerJs.MarkerAreaState>();

  const [filterMarkers, setFilterMarkers] =
    useState<markerJs.MarkerAreaState>();

  console.log(filterMarkers);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const onChoosePhoto = () => inputRef?.current?.click();

  const handleShowMark = () => {
    if (imgRef?.current) {
      const markerArea = new markerJs.MarkerArea(imgRef.current);

      markerArea.settings.defaultColor = COLOR.RED;
      markerArea.settings.defaultColorSet = MARKER_VALUES.COLORS;
      markerArea.settings.defaultStrokeWidth = MARKER_VALUES.STROKE_WIDTH;
      markerArea.settings.defaultFillColor = "hotpink";

      markerArea.availableMarkerTypes = [
        markerJs.FrameMarker,
        markerJs.ArrowMarker,
        markerJs.EllipseFrameMarker,
      ];

      markerArea.uiStyleSettings.canvasBackgroundColor = "lime";

      markerArea.addEventListener("markercreate", (event) =>
        event.markerArea.createNewMarker(markerJs.FrameMarker)
      );

      markerArea.addEventListener("render", (event) => {
        event.preventDefault();

        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;
        }

        setMarkerState(event.state);
      });

      markerArea.show();

      if (markerState) {
        markerArea.restoreState(markerState);
      }
    }
  };

  const handleFilterMarker = (selectedCondition: ConditionKey) => {
    if (markerState?.markers) {
      const found = findMarkerWithCondition(
        markerState.markers,
        selectedCondition
      );

      const filtered = { ...markerState, markers: found };

      setFilterMarkers(filtered);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        accept="image/*"
        type="file"
        hidden
        onChange={onImageChange}
      />
      <div className="bg-white flex justify-between p-4 sticky top-0">
        <div className="flex space-x-2">
          <button
            className="border-2 border-sky-600 rounded px-2 py-1 bg-sky-600 text-white"
            type="button"
            onClick={onChoosePhoto}
          >
            อัพโหลดรูปภาพ
          </button>
        </div>
      </div>
      <section className="flex">
        {selectedImage && (
          <div className="cursor-pointer max-w-[60%] overflow-hidden max-h-[70%] mt-[40px]">
            <img
              ref={imgRef}
              className="h-full w-full hover:scale-1 duration-200 transition-all object-cover"
              loading="lazy"
              src={URL.createObjectURL(selectedImage)}
              alt="phone-photo"
              onClick={handleShowMark}
            />
          </div>
        )}
        {selectedImage && (
          <div className="grid p-4 w-full gap-1 ml-auto h-fit grid-cols-1">
            <span className="flex mb-2 justify-evenly items-center">
              <h2 className="font-bold">เลือกตามเงื่อนไข:</h2>
              <button className="border-2 border-red-500 text-red-500 px-2 py-1 rounded">
                รีเซ็ต
              </button>
            </span>
            {conditionsFilter.map(({ label, key: conditionKey }) => (
              <button
                className="border-2 py-1 px-2 rounded hover:bg-gray-100 disabled:opacity-60"
                key={conditionKey}
                disabled={!markerState?.markers.length}
                onClick={() => handleFilterMarker(conditionKey)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;
