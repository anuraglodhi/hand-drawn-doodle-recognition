import React, { useRef, createContext, useContext } from "react";

interface CanvasContextType {
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  clearCanvas: () => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const clearCanvas = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        contextRef,
        clearCanvas,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext) as CanvasContextType;
