import type { Marker } from "@/types";

export const cleanedMarkerValue = (markers: Marker) => {
  const filtered = Object.entries(markers).filter(
    ([_, value]) => value.markers.length
  );

  const converted = Object.fromEntries(filtered);

  return converted;
};
