/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { conditionsFilter } from "@/mapping";
import { useHandleUploadImage, useMarker } from "@/hook";

const MainPage = () => {
  const {
    ref: { inputRef },
    state: { selectedImage },
    action: { handleImageChange, handleChooseImage },
  } = useHandleUploadImage();

  const {
    ref: { imgRef },
    state: {
      isLoading,
      isDisabledUploadImage,
      isHideEditMarker,
      groupedConditions,
      isDisabledGetData,
      isDisabledSave,
    },
    action: {
      handleAddMarker,
      handleSavedMarkerData,
      handleReset,
      handleGetData,
      handleShowMarker,
    },
  } = useMarker();

  return (
    <div>
      <input
        ref={inputRef}
        accept="image/*"
        type="file"
        hidden
        onChange={handleImageChange}
      />
      <div className="bg-white flex justify-between p-4 sticky top-0 z-10">
        <div className="w-full flex justify-center space-x-5">
          <button
            className="border-2 border-transparent hover:bg-sky-700 duration-300 transition-all rounded px-2 py-1 bg-sky-600 text-white disabled:opacity-60"
            disabled={isDisabledUploadImage}
            onClick={handleChooseImage}
          >
            อัพโหลดรูปภาพ
          </button>
          <button
            className="border-2 border-sky-600 rounded px-2 py-1 bg-transparent text-sky-600 disabled:opacity-50"
            disabled={isDisabledGetData}
            onClick={handleGetData}
          >
            ดึงข้อมูล
          </button>
          <button
            disabled={isDisabledSave || !selectedImage}
            onClick={handleSavedMarkerData}
            className="border-2 border-green-600 px-2 py-1 rounded bg-green-600 text-white disabled:opacity-50"
          >
            {isLoading ? "กำลังบันทึก" : "บันทึก"}
          </button>
        </div>
      </div>
      <section className="flex">
        {selectedImage && (
          <div className="mx-auto max-w-[50%] max-h-[65%] mt-[40px]">
            <picture>
              <img
                ref={imgRef}
                className="h-full w-full hover:scale-1 duration-200 transition-all object-cover"
                loading="lazy"
                src={selectedImage}
                alt="phone-photo"
                decoding="async"
              />
            </picture>
          </div>
        )}
        {selectedImage && (
          <div className="max-w-[400px] grid p-4 w-full gap-2 ml-auto h-fit grid-cols-1">
            <span className="flex mb-2 justify-evenly items-center">
              <h2 className="font-bold">เลือกตามเงื่อนไข:</h2>
              <button
                className="w-[200px] border-2 border-red-500 text-red-500 px-2 py-1 rounded disabled:opacity-60"
                onClick={handleReset}
                disabled={isHideEditMarker}
              >
                รีเซ็ต
              </button>
            </span>
            {conditionsFilter.map(({ label, key: conditionKey }) => (
              <button
                className={`${
                  groupedConditions.includes(conditionKey)
                    ? "bg-slate-200"
                    : "bg-transparent"
                }  border-2 py-1 px-2 rounded disabled:cursor-not-allowed disabled:opacity-40`}
                key={conditionKey}
                onClick={() =>
                  isHideEditMarker
                    ? handleShowMarker(conditionKey)
                    : handleAddMarker(conditionKey)
                }
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
