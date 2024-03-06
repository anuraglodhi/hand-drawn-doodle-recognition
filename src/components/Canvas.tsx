import { useEffect, useRef, useState } from "react"

interface canvasProps {
  width: number
  height: number
};

const Canvas = ({ width, height } : canvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef:React.MutableRefObject<CanvasRenderingContext2D | null> = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<Boolean>(false)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'Black';
    ctx.lineWidth = 2;
    contextRef.current = ctx;
    console.log(ctx);
  }, [])
  
  const handleOnMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const nativeEvent = e.nativeEvent as MouseEvent;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current?.beginPath();
    console.log(offsetX, offsetY);
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const handleOnMouseUp = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  }

  const handleOnMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing)
      return 
    const nativeEvent = e.nativeEvent as MouseEvent;
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke()
  }

  return (
    <canvas 
      width={width}
      height={height}
      ref={canvasRef}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseMove={handleOnMouseMove}
    />
  )
}

export default Canvas