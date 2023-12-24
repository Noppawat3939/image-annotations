import { useRef, useState } from "react";
import { mapConditionWithMarkerState } from "@/helper";
import type { ConditionKey, Marker, MarkerData } from "@/types";
import * as markerJs from "markerjs2";
import { MARKER_DEFAULT_VALUES } from "@/constants";
import uniqid from "uniqid";

type Status = "loading" | "idle" | "success" | "error";
type UseMarkerParams = { image?: File | null; wait?: number };

const LOCAL_STORAGE_KEY = "data";

const useMarker = (params: UseMarkerParams) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [markerValues, setMarkerValues] = useState<Marker | null>(null);

  const handleAddMarker = (condition: ConditionKey) => {
    if (imgRef?.current) {
      const markerArea = new markerJs.MarkerArea(imgRef.current);

      const mappedMarker = mapConditionWithMarkerState(condition);

      if (mappedMarker) {
        markerArea.settings.defaultColor = mappedMarker.color;
        markerArea.settings.defaultStrokeWidth =
          MARKER_DEFAULT_VALUES.STROKE_WIDTH;
        markerArea.settings.defaultFillColor = mappedMarker.color;

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
          markerArea?.restoreState(markerValues?.[condition]);
        }
      }
    }
  };

  const handleSavedMarkerData = () => {
    if (params.image) {
      setStatus("loading");
      const image = URL.createObjectURL(params.image);

      const merge = {
        image,
        marker: markerValues,
        createdAt: new Date().toISOString(),
      };

      const prevData = window.localStorage.getItem("data");

      setTimeout(() => {
        if (prevData) {
          const parsed = JSON.parse(prevData) as MarkerData[];

          const updated = [
            ...parsed,
            { ...merge, id: uniqid() },
          ] as MarkerData[];

          window.localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updated)
          );
        } else {
          const savedData = [{ ...merge, id: uniqid() }];

          window.localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(savedData)
          );
        }

        handleReset();
      }, params.wait || 2000);
    }
  };

  const handleReset = () => {
    setMarkerValues(null);
    setStatus("idle");
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  const groupedSelectedConditions = markerValues
    ? Object.keys(markerValues)
    : [];

  return {
    state: {
      isLoading,
      isSuccess,
      markerValues,
      groupedConditions: groupedSelectedConditions,
    },
    action: { handleAddMarker, handleSavedMarkerData, handleReset },
    ref: { imgRef },
  };
};

export default useMarker;
