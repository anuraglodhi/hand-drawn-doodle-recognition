import './App.css'

import Canvas from './components/Canvas.tsx'

function App() {
  return (
    <>
      <div className='app-container fixed top-0 left-0 h-dvh w-dvw dark:bg-slate-950 bg-slate-50'>
        <div className='canvas-container flex h-dvh w-[40%] justify-center items-center'>
          <Canvas width={400} height={400} />
        </div>
      </div>
    </>
  )
}

export default App
