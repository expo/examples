"use dom";

import { Cropper } from "react-mobile-cropper";
import "react-mobile-cropper/dist/style.css";

export default function CropPage({
  image,
  style,
}: {
  image: string;
  style?: React.CSSProperties;
  dom?: import("expo/dom").DOMProps;
}) {
  return <Cropper style={style} src={image} className="cropper" />;
}
