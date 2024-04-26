import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { CoinCanvasProps } from "../../types";

const CoinCanvas: React.FC<CoinCanvasProps> = ({
  width = 250,
  height = 250,
  onLoad,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (canvas.current && !initialized) {
      const initRenderer = (_canvas: HTMLCanvasElement) => {
        const renderer = new THREE.WebGLRenderer({
          canvas: _canvas,
          alpha: true,
        });

        if (window.innerWidth > 768) {
          renderer.setPixelRatio(5);
        }

        renderer.setSize(width, height);

        return renderer;
      };

      const initCamera = () => {
        const camera = new THREE.PerspectiveCamera(41, width / height, 1, 2000);
        camera.position.z = 630;

        return camera;
      };

      const initScene = () => {
        return new THREE.Scene();
      };

      onLoad({
        canvas: canvas.current,
        renderer: initRenderer(canvas.current),
        camera: initCamera(),
        scene: initScene(),
      });
      setInitialized(true);
    }
  }, [canvas, width, height, onLoad, initialized]);

  return (
    <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] max-md:scale-95">
      <div className="absolute z-[0] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-white opacity-40 blur-[50px]" />
      <canvas ref={canvas} className="relative z-[1]" />
    </div>
  );
};

export default React.memo(CoinCanvas);
