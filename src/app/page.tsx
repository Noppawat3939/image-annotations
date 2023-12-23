/* eslint-disable @next/next/no-img-element */
"use client";

import React, { type ChangeEvent, useRef, useState, useEffect } from "react";
import * as marker from "markerjs2";
import * as mjslive from "markerjs-live";
import { conditionsFilter } from "@/mapping";
import { MARKER_DEFAULT_VALUES as MARKER_VALUES } from "@/constants";

const STORAGE_KEY = "markValues";

const MainPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>();

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const onChoosePhoto = () => {
    inputRef?.current?.click();
  };

  const getMarkValues = () => {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);

      if (value) {
        return JSON.parse(value) as unknown as marker.MarkerAreaState;
      }
    } catch {
      throw Error;
    }
  };

  const handleShowMark = () => {
    if (imgRef?.current) {
      const markerArea = new marker.MarkerArea(imgRef.current);
      markerArea.settings.defaultColorSet = MARKER_VALUES.COLORS;
      markerArea.settings.defaultStrokeWidth = MARKER_VALUES.STROKE_WIDTH;

      markerArea.addEventListener("markercreate", (event) => {
        event.markerArea.createNewMarker(marker.FrameMarker);
      });

      markerArea.addEventListener("render", (event) => {
        event.preventDefault();

        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;
        }

        console.log(event);

        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(event.state));
      });

      markerArea.show();

      if (getMarkValues()) {
        markerArea.restoreState(getMarkValues()!);
      }
    }
  };

  useEffect(() => {
    if (window) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const onToggleViewAnnotations = () => {
    if (imgRef?.current) {
      const markerView = new mjslive.MarkerView(imgRef.current);

      const markerArea = new marker.MarkerArea(imgRef.current);
      console.log("click_");
      markerView.close();

      // if (!markerView.isOpen && getMarkValues() !== undefined) {
      //   markerView.show(getMarkValues()!);
      // } else {
      //   markerView.close();
      // }
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
            Upload image
          </button>
        </div>
        {selectedImage && (
          <button
            onClick={onToggleViewAnnotations}
            className="border-2 text-sky-500 border-sky-500 rounded-md py-1 px-2 hover:bg-sky-500 hover:text-white"
          >
            view annotation
          </button>
        )}
      </div>
      <section className="flex">
        {selectedImage && (
          <div className="cursor-pointer max-w-[60%] overflow-hidden max-h-[70%] mt-[40px]">
            <img
              ref={imgRef}
              crossOrigin="anonymous"
              className="h-full w-full hover:scale-1 duration-200 transition-all object-cover"
              loading="lazy"
              src={URL.createObjectURL(selectedImage)}
              alt="phone-photo"
              onClick={handleShowMark}
            />
          </div>
        )}
        {selectedImage && (
          <div className="grid p-4 w-[200px] gap-1 ml-auto h-fit grid-cols-1">
            {conditionsFilter.map(({ label, key }) => (
              <button
                className="border-2 py-1 px-2 rounded hover:bg-gray-100"
                key={key}
                onClick={() => console.log("filter_", key)}
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
