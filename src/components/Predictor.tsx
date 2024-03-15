import * as tf from '@tensorflow/tfjs';
import { useEffect, useState } from 'react';
import { useCanvas } from './CanvasContext';
import categories from '../assets/categories';

const loadModel = async () => {
  try {
    const model = await tf.loadLayersModel('../../model/model.json');
    return model;
  } catch (error) {
    console.log('Can\'t load model');
    return null;
  }
}

const Predictor = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const[predictions, setPredictions]= useState<Float32Array | Int32Array | Uint8Array | undefined>(undefined);

  const categoryList = categories.split(' ')

  const { canvasRef } = useCanvas();

  useEffect(() => {
    loadModel().then((m) => setModel(m));
  }, [])

  setInterval(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    predict(imageData);
  }, 10000);

  const resizeImage = (imageData: ImageData) => {
    const tensor = tf.browser.fromPixels(imageData);
    const resized = tf.image.resizeBilinear(tensor, [28, 28]);
    const grayscale = tf.image.rgbToGrayscale(resized);
    const batchedResized = tf.expandDims(grayscale, 0);
    return batchedResized;
  };

  const preprocessImage = (imageData: ImageData) => {
    const resized = resizeImage(imageData);
    const normalized = resized.div(tf.scalar(255.0));
    return normalized;
  };

  const predict = async (imageData: ImageData) => {
    const preprocessedImage = preprocessImage(imageData);
    if (!model) return;
    const predictions = await model.predict(preprocessedImage) as tf.Tensor<tf.Rank>;
    setPredictions(predictions.dataSync());
  }
  

  return (
    <div className='predictions font-mono flex flex-col'>
      <table>
        <tbody>
          {predictions && Array.isArray(predictions) && predictions.map((prediction: number, key: number) => (
            <tr key={key} className='p-2 m-2 flex items-start font-mono capitalize shadow-xl w-[120px]'>
            <td>{categoryList[key] + ' ' + prediction.toFixed(2)}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Predictor