import './App.css'

import Canvas from './components/Canvas.tsx'
import { useCanvas } from './components/CanvasContext.tsx'

function App() {
  const { canvasRef, clearCanvas } = useCanvas();

  return (
    <>
      <div className='app-container fixed top-0 left-0 flex h-dvh w-dvw dark:bg-zinc-800 bg-slate-50'>
        <div className='drawing-container flex flex-col h-dvh w-[50%] justify-center items-center p-10'>
          <div className='canvas-title p-2 m-2 text-2xl font-mono font-bold'>
          Unleash your inner artist!
          </div>
          <div className='canvas-continer dark:shadow-mid shadow-2xl'>
            <Canvas width={400} height={400} />
          </div>
          <button className='p-2 m-5 shadow-inner dark:text-zinc-50 text-gray-800 font-mono'
            onClick={clearCanvas}
          >
            Clear Canvas
          </button>
        </div>
        <div className='blue-splotch absolute top-[50%] left-[50%] h-[200px] w-[200px] dark:opacity-40 bg-blue-500 blur-3xl z-[-1]'/>
        <div className='green-splotch absolute top-[10%] right-[0%] h-[100px] w-[100px] dark:opacity-40 bg-green-300 blur-3xl z-[-1]'/>

        <div className='prediction-container flex justify-center items-center w-full'>
          {/* <button className='p-2 dark:bg-slate-50 size-fit bg-slate-950 text-gray-800 m-5'
            onClick={() => {
              const imageData = canvasRef.current?.toDataURL('image/png');
              console.log(imageData);
          }}
          >
            Data
          </button> */}
        </div>
      </div>
    </>
  )
}

export default App
