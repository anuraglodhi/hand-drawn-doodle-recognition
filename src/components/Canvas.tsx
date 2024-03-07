import { useEffect } from "react"

import { useCanvas } from "./CanvasContext"

interface CanvasProps {
  width: number
  height: number
};

const Canvas = ({ width, height }: CanvasProps) => {
  const {
    canvasRef,
    prepareCanvas,
    handleOnMouseDown,
    handleOnMouseUp,
    handleOnMouseMove
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
    />
  );
}

export default Canvas
