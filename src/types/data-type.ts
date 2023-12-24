import { type MarkerAreaState } from "markerjs2";
import { ConditionKey } from ".";

export type MarkerData = {
  id: string;
  createdAt: string | Date;
  image: Blob | string;
  marker: Marker;
};

export type Marker = Record<ConditionKey, MarkerAreaState>;
