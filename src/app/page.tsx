/* eslint-disable @next/next/no-img-element */
"use client";

import React, { type ChangeEvent, useRef, useState } from "react";
import * as markerJs from "markerjs2";
import { conditionsFilter } from "@/mapping";
import { MARKER_DEFAULT_VALUES as MARKER_VALUES } from "@/constants";
import { ConditionKey } from "@/types";
import { mapConditionWithMarkerState } from "@/helper";

const MainPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>();

  const [selectedCondition, setSelectedCondition] =
    useState<ConditionKey>("scratch");

  const [markerValues, setMarkerValues] = useState<Record<
    ConditionKey,
    markerJs.MarkerAreaState
  > | null>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const onChoosePhoto = () => inputRef?.current?.click();

  const handleAddMarker = (condition: ConditionKey) => {
    if (imgRef?.current) {
      const markerArea = new markerJs.MarkerArea(imgRef.current);

      const mappedMarker = mapConditionWithMarkerState(condition);

      if (mappedMarker) {
        markerArea.settings.defaultColor = mappedMarker.color;
        markerArea.settings.defaultStrokeWidth = MARKER_VALUES.STROKE_WIDTH;
        markerArea.uiStyleSettings.hideToolbox = true;

        markerArea.availableMarkerTypes = [mappedMarker.typeName];

        markerArea.addEventListener("markercreate", (event) => {
          event.defaultPrevented;
          event.marker?.deselect();
          event.markerArea.createNewMarker(mappedMarker.typeName);
        });

        markerArea.addEventListener("render", (event) => {
          event.preventDefault();

          if (imgRef.current) {
            imgRef.current.src = event.dataUrl;
          }

          const update = {
            ...markerValues,
            [condition]: event.state,
          } as typeof markerValues;

          setMarkerValues(update);
        });

        markerArea.show();

        if (markerValues && markerArea) {
          markerArea.restoreState(markerValues?.[condition]);
        }
      }
    }
  };

  const onSelectCondition = (condition: ConditionKey) => {
    setSelectedCondition(condition);
    handleAddMarker(condition);
  };

  const handleReset = () => {
    setMarkerValues(null);
    setSelectedCondition("scratch");
  };

  const onSaveImageWithMarkers = () => {
    if (selectedImage) {
      const image = URL.createObjectURL(selectedImage);

      const combined = {
        image,
        marker: markerValues,
        createdAt: new Date().toISOString(),
      };

      console.log("save 🚀", combined);
    }
  };

  const isDisabledSave = !selectedImage || !markerValues;

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
        <div className="w-full flex justify-center space-x-5">
          <button
            className="border-2 border-sky-600 rounded px-2 py-1 bg-sky-600 text-white"
            type="button"
            onClick={onChoosePhoto}
          >
            อัพโหลดรูปภาพ
          </button>
          <button
            disabled={isDisabledSave}
            onClick={onSaveImageWithMarkers}
            className="border-2 border-teal-600 px-2 py-1 rounded bg-teal-600 text-white disabled:opacity-50"
          >
            บันทึก
          </button>
        </div>
      </div>
      <section className="flex">
        {selectedImage && (
          <div className="cursor-pointer max-w-[60%] overflow-hidden max-h-[65%] mt-[40px]">
            <img
              ref={imgRef}
              className="h-full w-full hover:scale-1 duration-200 transition-all object-cover"
              loading="lazy"
              src={URL.createObjectURL(selectedImage)}
              alt="phone-photo"
            />
          </div>
        )}
        {selectedImage && (
          <div className=" max-w-[300px] grid p-4 w-full gap-1 ml-auto h-fit grid-cols-1">
            <span className="flex mb-2 justify-evenly items-center">
              <h2 className="font-bold">เลือกตามเงื่อนไข:</h2>
              <button
                className="border-2 border-red-500 text-red-500 px-2 py-1 rounded"
                onClick={handleReset}
              >
                รีเซ็ต
              </button>
            </span>
            {conditionsFilter.map(({ label, key: conditionKey }) => (
              <button
                className={`${
                  selectedCondition === conditionKey
                    ? "bg-slate-300"
                    : "bg-transparent"
                }  border-2 py-1 px-2 rounded disabled:cursor-not-allowed disabled:opacity-40`}
                key={conditionKey}
                onClick={() => onSelectCondition(conditionKey)}
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
