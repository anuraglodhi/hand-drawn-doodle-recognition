import * as tf from "@tensorflow/tfjs";

import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";

import { useCanvas } from "./CanvasContext";
import categories from "../assets/categories";

const loadModel = async () => {
  try {
    const model = await tf.loadLayersModel("../../model/model.json");
    return model;
  } catch (error) {
    console.log("Can't load model");
    return null;
  }
};

const Predictor = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [predictions, setPredictions] = useState<number[][]>([]);

  const categoryList = categories.split(" ");

  const { contextRef } = useCanvas();

  const isBlank = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    const pixelData = new Uint32Array(
      ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height).data
    );

    return !pixelData.some((color) => color !== 255);
  };

  useEffect(() => {
    loadModel().then((m) => setModel(m));
  }, []);

  useEffect(() => {
    const inter = setInterval(() => {
      const ctx = contextRef.current;
      if (!ctx) return;
      const imageData = ctx.getImageData(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      predict(imageData);
    }, 1000);

    const resizeImage = (imageData: ImageData) => {
      const tensor = tf.browser.fromPixels(imageData);
      const resized = tf.image.resizeNearestNeighbor(tensor, [28, 28]);
      const grayscale = tf.image.rgbToGrayscale(resized);

      const batchedResized = tf.expandDims(grayscale, 0);
      return batchedResized;
    };

    const preprocessImage = (imageData: ImageData) => {
      // invert colors
      for (let i = 0; i < imageData.data.length; i++) {
        imageData.data[i] = 255 - imageData.data[i];
      }

      const resized = resizeImage(imageData);
      const normalized = resized.div(tf.scalar(255.0));

      // console.log(normalized);

      return normalized;
    };

    const predict = async (imageData: ImageData) => {
      const preprocessedImage = preprocessImage(imageData);
      if (!model) return;
      const predictions = model.predict(
        preprocessedImage
      ) as tf.Tensor<tf.Rank>;
      const data = Array.from(await predictions.data<"float32">());
      const indexedData = data.map((val, ind) => [val, ind]);
      indexedData.sort((a, b) => b[0] - a[0]);
      setPredictions(indexedData);
      predictions.dispose();
    };

    return () => clearInterval(inter);
  }, [contextRef, model]);

  return (
    <Reorder.Group values={predictions} onReorder={setPredictions} as="table">
      <tbody>
        {isBlank() ? (
          <tr className="flex text-sm sm:text-2xl mt-[75%]">
            <td>Draw Something!</td>
          </tr>
        ) : (
          Array.from(predictions)
            .slice(0, 7)
            .map((prediction: number[]) => (
              <Reorder.Item
                key={prediction[1]}
                value={prediction[1]}
                className={`p-2 m-2 min-w-[calc(100vw*0.9)] sm:min-w-[350px] flex justify-between items-start font-mono text-sm sm:text-2xl capitalize shadow-xl ${
                  prediction == predictions[0]
                    ? "dark:bg-white/5 bg-green-600/5 font-bold"
                    : "bg-none"
                }`}
                as="tr"
              >
                <td className="sm:mr-20 mr-10">
                  {categoryList[prediction[1]].split(/[_-]+/).join(" ")}
                </td>
                <td>{(Number(prediction[0]) * 100).toFixed(2) + " %"}</td>
              </Reorder.Item>
            ))
        )}
      </tbody>
    </Reorder.Group>
  );
};

export default Predictor;
