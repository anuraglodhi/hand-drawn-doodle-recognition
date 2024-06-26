import "./App.css";

import Canvas from "./components/Canvas.tsx";
import { useCanvas } from "./components/CanvasContext.tsx";
import CategoriesList from "./components/CategoriesList.tsx";
import Predictor from "./components/Predictor.tsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet.tsx";
import { ArrowUpFromLine } from "lucide-react";

const App = () => {
  const { clearCanvas } = useCanvas();
  const size = window.innerWidth > 400 ? 400 : window.innerWidth * 0.9;

  return (
    <>
      <div className="flex flex-col items-center dark:text-zinc-50 text-gray-800">
        <div className="app-container fixed top-0 left-0 flex flex-col scroll-m-0 h-[100%] w-[100%] dark:bg-zinc-800 bg-slate-50">
          <div className="nav py-2 px-10 w-full flex fex-row justify-center h-fit shadow-lg rounded-b-lg">
            <div className="app-title text-sm font-extrabold sm:text-3xl font-mono sm:font-bold">
              Hand Drawn Doodle Recognition
            </div>
          </div>
          <div className="app-body flex flex-col sm:flex-row">
            <div className="drawing-container flex flex-col w-full sm:w-[50%] justify-start items-center px-10">
              <div className="canvas-title p-2 m-2 text-xs sm:text-2xl font-mono font-bold">
                Unleash your inner artist!
              </div>
              <div className="canvas-continer dark:shadow-mid-2xl shadow-2xl">
                <Canvas width={size} height={size} />
              </div>
              <button
                className="m-2 p-2 shadow-2xl sm:text-base text-sm bg-gray-500/10 dark:bg-white/10 font-mono rounded-sm"
                onClick={clearCanvas}
              >
                Clear Canvas
              </button>
            </div>

            <div className="blue-splotch absolute sm:top-[50%] top-[80%] sm:left-[50%] left-[60%] sm:h-[200px] h-[120px] aspect-square bg-blue-500/40 blur-3xl z-[-1]" />
            <div className="green-splotch absolute top-[10%] sm:right-[0%] right-[10%] h-[100px] aspect-square bg-green-300/80 blur-3xl z-[-1]" />
            <div className="yellow-splotch absolute sm:top-[15%] top-[50%] sm:left-[5%] left-[10%] sm:h-[200px] h-[100px] aspect-square bg-yellow-200/40 blur-3xl z-[-1]" />

            <div className="prediction-container h-full w-full flex flex-col justify-start items-center">
              <p className="m-2 p-2 sm:text-2xl text-xs font-mono font-bold">
                Predictions
              </p>
              <Predictor />
            </div>
          </div>
        </div>

        <Sheet>
          <SheetTrigger className="fixed bottom-1 flex flex-col items-center font-bold sm:text-base text-xs sm:animate-[bounce_5s_ease-in-out_infinite] right-1 sm:right-auto">
            <ArrowUpFromLine className="h-6 w-6 sm:block hidden" />
            All
            <br />
            categories
          </SheetTrigger>
          <SheetContent
            side={window.innerWidth >= 640 ? "bottom" : "right"}
            className="sm:max-h-[calc(100vh-100px)] h-[100vh] sm:w-[100vw] w-[90%] flex flex-col p-0 dark:bg-zinc-800 bg-white"
          >
            <SheetHeader className="flex items-center mt-3">
              <SheetTitle className="font-extrabold sm:text-3xl sm:font-bold">
                Our categories
              </SheetTitle>
              <SheetDescription>
                Choose from 345 categories to draw!
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-y-scroll flex-1">
              <CategoriesList />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default App;
