import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
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
    <div className="predictions font-mono">
      <table>
        <tbody>
          {Array.from(predictions)
            .slice(0, 7)
            .map((prediction: number[]) => (
              <tr
                key={prediction[1]}
                className="p-2 m-2 flex justify-between items-start font-mono sm:text-2xl text-xs capitalize shadow-xl"
              >
                <td className="sm:mr-20 mr-10">
                  {categoryList[prediction[1]].split(/[_-]+/).join(" ")}
                </td>
                <td>{(Number(prediction[0]) * 100).toFixed(2) + " %"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Predictor;
