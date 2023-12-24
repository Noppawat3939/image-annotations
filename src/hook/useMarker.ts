import { useCallback, useEffect, useRef, useState } from "react";
import {
  cleanedMarkerValue,
  getBase64,
  mapConditionWithMarkerState,
} from "@/helper";
import type { ConditionKey, Marker, MarkerData } from "@/types";
import * as markerJs from "markerjs2";
import { MARKER_DEFAULT_VALUES } from "@/constants";
import uniqid from "uniqid";
import { useImageStore } from "@/store";

type Status = "loading" | "idle" | "success" | "error";

const LOCAL_STORAGE_KEY = "data";

const useMarker = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const { selectedImageFile, setImageUrl } = useImageStore((store) => ({
    selectedImageFile: store.imageFile,
    setImageUrl: store.setImageUrl,
  }));

  const [status, setStatus] = useState<Status>("idle");
  const [markerValues, setMarkerValues] = useState<Marker | null>(null);
  const [hasPrevData, setHasPrevData] = useState(false);
  const [isHideEditMarker, setIsHideEditMarker] = useState(false);

  useEffect(() => {
    const prevData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (prevData) {
      setHasPrevData(true);
    } else {
      setHasPrevData(false);
    }
  }, []);

  const getMarkerData = async () => {
    try {
      const getPrevData = () => window.localStorage.getItem(LOCAL_STORAGE_KEY);

      if (getPrevData()) {
        const parsedPrevData = JSON.parse(getPrevData()!) as MarkerData[];

        // mock get data from first index
        const dataFirstIndx = parsedPrevData.at(0);

        if (dataFirstIndx) {
          setImageUrl(String(dataFirstIndx.image));
          setMarkerValues(dataFirstIndx?.marker);
        }

        setIsHideEditMarker(true);
      }
    } catch (error) {
      setImageUrl(null);
      setIsHideEditMarker(false);
    }
  };

  const handleAddMarker = (condition: ConditionKey) => {
    if (imgRef?.current) {
      const markerArea = new markerJs.MarkerArea(imgRef.current);

      const mappedMarker = mapConditionWithMarkerState(condition);

      if (mappedMarker) {
        markerArea.settings.defaultColor = mappedMarker.color;
        markerArea.settings.defaultStrokeWidth =
          MARKER_DEFAULT_VALUES.STROKE_WIDTH;
        markerArea.settings.defaultFillColor = mappedMarker.color;

        markerArea.uiStyleSettings.hideToolbar = isHideEditMarker;

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

  const handleSavedMarkerData = async () => {
    if (selectedImageFile) {
      setStatus("loading");

      const convertedFileToBase64 = await getBase64(selectedImageFile);
      const marker = markerValues ? cleanedMarkerValue(markerValues) : null;
      const createdAt = new Date().toISOString();

      const combined = { image: convertedFileToBase64, marker, createdAt };

      const prevData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

      setTimeout(() => {
        if (prevData) {
          const _parsed = JSON.parse(prevData) as MarkerData[];

          const updated = [
            ..._parsed,
            { ...combined, id: uniqid() },
          ] as MarkerData[];

          window.localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(updated)
          );
        } else {
          const savedData = [{ ...combined, id: uniqid() }];

          window.localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(savedData)
          );
        }

        handleReset();
      }, 2000);
    }
  };

  const handleReset = useCallback(() => {
    setMarkerValues(null);
    setStatus("idle");
    setIsHideEditMarker(false);
  }, []);

  const groupedSelectedConditions = markerValues
    ? Object.keys(markerValues)
    : [];

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return {
    state: {
      isLoading,
      isSuccess,
      markerValues,
      groupedConditions: groupedSelectedConditions,
      isDisabledGetData: !hasPrevData,
      isHideEditMarker,
    },
    action: {
      handleAddMarker,
      handleSavedMarkerData,
      handleReset,
      handleGetData: getMarkerData,
    },
    ref: { imgRef },
  };
};

export default useMarker;
