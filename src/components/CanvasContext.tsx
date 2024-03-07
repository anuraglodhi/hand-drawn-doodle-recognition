import { useState, useRef, createContext, useContext } from "react"

interface CanvasContextType {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  contextRef: React.RefObject<CanvasRenderingContext2D>;
  prepareCanvas: () => void;
  handleOnMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleOnMouseUp: () => void;
  handleOnMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  clearCanvas: () => void;
};

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef:React.MutableRefObject<CanvasRenderingContext2D | null> = useRef<CanvasRenderingContext2D | null>(null);
  const [inUse, setInUse] = useState<Boolean>(false)
  
  const prepareCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'Black';
    ctx.lineWidth = 4;
    contextRef.current = ctx;
  };
  
  const handleOnMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const nativeEvent = e.nativeEvent as MouseEvent;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current?.beginPath();
    console.log(offsetX, offsetY);
    contextRef.current?.moveTo(offsetX, offsetY);
    setInUse(true);
  };

  const handleOnMouseUp = () => {
    contextRef.current?.closePath();
    setInUse(false);
  };
  
  const handleOnMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!inUse)
      return 
    const nativeEvent = e.nativeEvent as MouseEvent;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke()
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  };

  return (
    <CanvasContext.Provider 
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        handleOnMouseDown,
        handleOnMouseUp,
        handleOnMouseMove,
        clearCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext) as CanvasContextType;