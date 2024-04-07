import { useEffect, useRef, useState } from "react";
import { useCanvas } from "./CanvasContext";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const { contextRef } = useCanvas();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inUse, setInUse] = useState<boolean>(false);

  const handleOnMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const nativeEvent = e.nativeEvent as MouseEvent;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.moveTo(offsetX, offsetY);
    contextRef.current?.beginPath();
    setInUse(true);
  };

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) {
      handleOnMouseDown(e);
    }
  };

  const handleOnTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const { touches } = e;
    if (touches.length > 1) return;
    const touch = touches[0];
    const rect = contextRef.current!.canvas.getBoundingClientRect();
    const { clientX, clientY } = touch;
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setInUse(true);
  };

  const handleOnMouseUp = () => {
    contextRef.current?.closePath();
    setInUse(false);
  };

  const handleOnTouchEnd = () => {
    contextRef.current?.closePath();
    setInUse(false);
  };

  const handleOnMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!inUse) return;
    const nativeEvent = e.nativeEvent as MouseEvent;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const handleOnTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!inUse) return;
    e.preventDefault();

    const { touches } = e;
    if (touches.length > 1) return;
    const touch = touches[0];
    const rect = contextRef.current!.canvas.getBoundingClientRect();
    const { clientX, clientY } = touch;
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "Black";
    ctx.lineWidth = 20;
    contextRef.current = ctx;
  }, [contextRef]);

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
