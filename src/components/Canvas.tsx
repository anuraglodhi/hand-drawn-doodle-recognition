import { useEffect } from "react";

import { useCanvas } from "./CanvasContext";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const {
    canvasRef,
    prepareCanvas,
    handleOnMouseDown,
    handleOnMouseEnter,
    handleOnTouchStart,
    handleOnMouseUp,
    handleOnTouchEnd,
    handleOnMouseMove,
    handleOnTouchMove,
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleOnMouseDown}
      onTouchStart={handleOnTouchStart}
      onMouseUp={handleOnMouseUp}
      onTouchEnd={handleOnTouchEnd}
      onMouseMove={handleOnMouseMove}
      onTouchMove={handleOnTouchMove}
      onMouseLeave={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      className="hover:cursor-pen"
    />
  );
};

export default Canvas;
