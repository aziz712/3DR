import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface Preview3DProps {
  imageUrl: string;
 
}


function Scene({ imageUrl }: Preview3DProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial map={undefined} />
      </mesh>
    </>
  );
}

export function Preview3D({ imageUrl }: Preview3DProps) {
  return (
    <div className="w-full h-[400px] bg-gray-900 rounded-xl overflow-hidden">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Scene imageUrl={imageUrl} />
          <OrbitControls enableDamping />
        </Suspense>
      </Canvas>
    </div>
  );
}

