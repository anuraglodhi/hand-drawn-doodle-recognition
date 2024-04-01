import './App.css'

import Canvas from './components/Canvas.tsx'
import { useCanvas } from './components/CanvasContext.tsx'
import CategoriesList from './components/CategoriesList.tsx';
import Predictor from './components/Predictor.tsx';

const App = () => {
  const { clearCanvas } = useCanvas();
  const size = window.innerWidth > 400 ? 400 : window.innerWidth * 0.9;

  return (
    <>
      <div className='app-container fixed top-0 left-0 flex flex-col sm:h-dvh w-dvw dark:bg-zinc-800 bg-slate-50'>
        <div className='nav py-2 px-10 w-full flex fex-row justify-center h-fit hover:shadow-xl rounded-b-lg'>
          <div className='app-title text-xl font-extrabold sm:text-3xl font-mono sm:font-bold'>
              Hand Drawn Doodle Recognition
          </div>
        </div>
        <div className='app-body flex flex-col sm:flex-row'>
          <div className='drawing-container flex flex-col w-full sm:w-[50%] justify-start items-center px-10'>
            <div className='canvas-title p-2 m-2 text-xl sm:text-2xl font-mono font-bold'>
            Unleash your inner artist!
            </div>
            <div className='canvas-continer dark:shadow-mid shadow-2xl'>
              <Canvas width={size} height={size} />
            </div>
            <button className='m-2 p-2 hover:shadow-xl dark:text-zinc-50 text-gray-800 font-mono rounded-sm'
              onClick={clearCanvas}
            >
              Clear Canvas
            </button>
          </div>

          <div className='blue-splotch absolute top-[50%] left-[50%] h-[200px] w-[200px] bg-blue-500/40 dark:bg-blue-500/40 blur-3xl z-[-1]'/>
          <div className='green-splotch absolute top-[10%] right-[0%] h-[100px] w-[100px] bg-green-300/40 blur-3xl z-[-1]'/>

          <div className='prediction-container h-full w-full flex flex-col justify-start items-center'>
          <p className='m-2 p-2 text-2xl font-mono font-bold'>Predictions</p>
            <Predictor />
          </div>
          <div className={`${size == 400 ? 'flex' : 'hidden'} list-container h-[80vh]`}>
            <p className='list-title m-2 font-mono font-bold'>Our Categories</p>
            <div className='h-full overflow-y-scroll'>
              <CategoriesList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
