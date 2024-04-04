import { useState, useRef, createContext, useContext } from "react";

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.RefObject<CanvasRenderingContext2D>;
  prepareCanvas: () => void;
  handleOnMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleOnMouseEnter: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleOnTouchStart: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  handleOnMouseUp: () => void;
  handleOnTouchEnd: () => void;
  handleOnMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleOnTouchMove: (e: React.TouchEvent<HTMLCanvasElement>) => void;
  clearCanvas: () => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef: React.MutableRefObject<CanvasRenderingContext2D | null> =
    useRef<CanvasRenderingContext2D | null>(null);
  const [inUse, setInUse] = useState<boolean>(false);

  const prepareCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "Black";
    ctx.lineWidth = 20;
    contextRef.current = ctx;
  };

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
    const rect = canvasRef.current!.getBoundingClientRect();
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
    const rect = canvasRef.current!.getBoundingClientRect();
    const { clientX, clientY } = touch;
    const offsetX = clientX - rect.left;
    const offsetY = clientY - rect.top;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        handleOnMouseDown,
        handleOnMouseEnter,
        handleOnTouchStart,
        handleOnMouseUp,
        handleOnTouchEnd,
        handleOnMouseMove,
        handleOnTouchMove,
        clearCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext) as CanvasContextType;
