import React, { useRef, createContext, useContext } from "react";

interface CanvasContextType {
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>;
  clearCanvas: () => void;
  draw: () => void;
  erase: () => void;
  undo: () => void;
  redo: () => void;
  saveState: () => void;
}

const CanvasContext = createContext<CanvasContextType | null>(null);

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  const clearCanvas = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "Black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    undoStack.current = [];
    redoStack.current = [];
  };

  const draw = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.strokeStyle = "#000000";
    ctx.canvas.style.cursor = "url('/pencil.svg') 0 15, default";
  };

  const erase = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    ctx.strokeStyle = "#FFFFFF";
    ctx.canvas.style.cursor = "url('/circle.svg') 0 15, default";
  };

  const saveState = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    undoStack.current.push(
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    );
  };

  const undo = () => {
    if (undoStack.current.length === 0) return;
    const ctx = contextRef.current;
    if (!ctx) return;
    redoStack.current.push(
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    );
    ctx.putImageData(undoStack.current.pop()!, 0, 0);
  };

  const redo = () => {
    if (redoStack.current.length === 0) return;
    const ctx = contextRef.current;
    if (!ctx) return;
    undoStack.current.push(
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    );
    ctx.putImageData(redoStack.current.pop()!, 0, 0);
  };

  return (
    <CanvasContext.Provider
      value={{
        contextRef,
        clearCanvas,
        draw,
        erase,
        undo,
        redo,
        saveState,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext) as CanvasContextType;
