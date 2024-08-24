import { useEffect, useRef, useState } from "react";
import { useCanvas } from "./CanvasContext";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const { contextRef, saveState } = useCanvas();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inUse, setInUse] = useState<boolean>(false);

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (e.buttons === 1) {
      handleOnMouseDown(e);
    }
  };

  const handleOnMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const nativeEvent = e.nativeEvent as MouseEvent;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.moveTo(offsetX, offsetY);
    contextRef.current?.beginPath();
    setInUse(true);
    saveState();
  };

  const handleOnMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!inUse) return;
    const nativeEvent = e.nativeEvent as MouseEvent;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const handleOnMouseUp = () => {
    contextRef.current?.closePath();
    setInUse(false);
  };

  const handleOnTouchStart = (e: TouchEvent) => {
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
    saveState();
  };

  const handleOnTouchMove = (e: TouchEvent) => {
    e.preventDefault();

    if (!inUse) return;

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

  const handleOnTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    contextRef.current?.closePath();
    setInUse(false);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 20;
    contextRef.current = ctx;

    canvas.addEventListener("touchstart", handleOnTouchStart, {
      passive: false,
    });
    canvas.addEventListener("touchmove", handleOnTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleOnTouchEnd, { passive: false });

    return () => {
      // Clean up the event listeners
      canvas.removeEventListener("touchstart", handleOnTouchStart);
      canvas.removeEventListener("touchmove", handleOnTouchMove);
      canvas.removeEventListener("touchend", handleOnTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={handleOnMouseDown}
      // onTouchStart={handleOnTouchStart}
      onMouseUp={handleOnMouseUp}
      // onTouchEnd={handleOnTouchEnd}
      onMouseMove={handleOnMouseMove}
      // onTouchMove={handleOnTouchMove}
      onMouseLeave={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      className="cursor-pen"
    />
  );
};

export default Canvas;
