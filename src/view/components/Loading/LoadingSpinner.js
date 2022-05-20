import "./Loading.css";
import { useEffect } from "react";

function LoadingSpinner() {
  useEffect(() => console.log("loadingSpinner"), []);

  return <i className="fa-solid fa-spinner fa-spin-pulse loading-spinner" />;
}

export default LoadingSpinner;
