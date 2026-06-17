"use client";

import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { Suspense, useState, useRef, useEffect } from "react";
import * as THREE from "three";

function useCenteredGeometry(geometry: THREE.BufferGeometry): number {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    geometry.computeBoundingBox();
    if (!geometry.boundingBox) return;
    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);
    geometry.computeBoundingBox();
    const size = new THREE.Vector3();
    geometry.boundingBox!.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    setScale(2 / maxDim);
  }, [geometry]);

  return scale;
}

type Rotation = [number, number, number];

function PointCloudScene({ url, rotation }: { url: string; rotation: Rotation }) {
  const geometry = useLoader(PLYLoader, url);
  const scale = useCenteredGeometry(geometry);
  return (
    <group scale={scale} rotation={rotation}>
      <points>
        <primitive object={geometry} attach="geometry" />
        <pointsMaterial vertexColors size={0.006} sizeAttenuation />
      </points>
    </group>
  );
}

function MeshScene({ url, rotation }: { url: string; rotation: Rotation }) {
  const geometry = useLoader(PLYLoader, url);
  const scale = useCenteredGeometry(geometry);
  useEffect(() => {
    geometry.computeVertexNormals();
  }, [geometry]);
  return (
    <group scale={scale} rotation={rotation}>
      <mesh>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.85} metalness={0} />
      </mesh>
    </group>
  );
}

function Controls({ isMesh }: { isMesh: boolean }) {
  const { camera } = useThree();
  const isDragging = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    camera.position.set(isMesh ? 1.2 : 0, isMesh ? 0.8 : 0.5, isMesh ? 2.5 : 3);
    camera.lookAt(0, 0, 0);
  }, [camera, isMesh]);

  useFrame((_, delta) => {
    if (isDragging.current) return;
    const angle = 0.35 * delta;
    const { x, z } = camera.position;
    camera.position.x = x * Math.cos(angle) + z * Math.sin(angle);
    camera.position.z = -x * Math.sin(angle) + z * Math.cos(angle);
    camera.lookAt(0, 0, 0);
  });

  return (
    <TrackballControls
      rotateSpeed={3.0}
      zoomSpeed={1.2}
      noPan
      onStart={() => {
        if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
        isDragging.current = true;
      }}
      onEnd={() => {
        resumeTimeout.current = setTimeout(() => {
          isDragging.current = false;
        }, 2000);
      }}
      makeDefault
    />
  );
}

function Lighting({ isMesh }: { isMesh: boolean }) {
  if (isMesh) {
    return (
      <>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 4, 3]} intensity={2.0} />
        <directionalLight position={[-3, 2, -2]} intensity={0.8} />
        <hemisphereLight args={["#ffffff", "#888888", 0.6]} />
      </>
    );
  }
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={1.2} />
      <pointLight position={[-3, -2, -3]} intensity={0.4} color="#ff6b2b" />
    </>
  );
}

function LoadingIndicator() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.3, 0.06, 12, 40]} />
      <meshStandardMaterial color="#ff6b2b" wireframe />
    </mesh>
  );
}

interface ReconstructionViewerProps {
  pcdUrl?: string;
  meshUrl: string;
  videoSrc: string;
  videoLabel: string;
  sceneLabel: string;
  rotation?: Rotation;
}

export default function ReconstructionViewer({
  pcdUrl,
  meshUrl,
  videoSrc,
  videoLabel,
  sceneLabel,
  rotation = [0, 0, 0],
}: ReconstructionViewerProps) {
  const [mode, setMode] = useState<"pcd" | "mesh">(pcdUrl ? "pcd" : "mesh");
  const isMesh = mode === "mesh";
  const bg = isMesh ? "#060d1e" : "#111826";

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: bg }}>
      {/* Mini video */}
      <div className="absolute top-2 left-2 z-10 w-[8rem] rounded-lg overflow-hidden border border-[#ff6b2b]/40 shadow-lg shadow-black/50">
        <video src={videoSrc} autoPlay muted loop playsInline className="w-full h-auto block" />
        <div className="bg-black/70 px-1.5 py-0.5">
          <span className="text-[0.5rem] font-mono uppercase tracking-wider text-[#ff6b2b]">
            {videoLabel}
          </span>
        </div>
      </div>

      {/* Scene label */}
      <div className="absolute top-2 right-2 z-10">
        <span className="text-[0.45rem] font-mono uppercase tracking-widest text-gray-600">
          {sceneLabel}
        </span>
      </div>

      {/* Mode toggle */}
      {pcdUrl && (
        <div className="absolute bottom-2.5 right-2.5 z-10 flex gap-1 bg-black/50 backdrop-blur-sm border border-white/5 rounded-lg p-1">
          <button
            onClick={() => setMode("pcd")}
            className={`px-2 py-1 text-[0.55rem] font-mono uppercase tracking-wider rounded-md transition-all duration-200 ${
              mode === "pcd" ? "bg-[#ff6b2b] text-black font-bold" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Point Cloud
          </button>
          <button
            onClick={() => setMode("mesh")}
            className={`px-2 py-1 text-[0.55rem] font-mono uppercase tracking-wider rounded-md transition-all duration-200 ${
              mode === "mesh" ? "bg-[#ff6b2b] text-black font-bold" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Mesh
          </button>
        </div>
      )}

      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]}>
        <color attach="background" args={[bg]} />
        <Lighting isMesh={isMesh} />

        <Suspense fallback={<LoadingIndicator />}>
          {mode === "pcd" && pcdUrl ? (
            <PointCloudScene key="pcd" url={pcdUrl} rotation={rotation} />
          ) : (
            <MeshScene key="mesh" url={meshUrl} rotation={rotation} />
          )}
        </Suspense>

        <Controls isMesh={isMesh} />
      </Canvas>
    </div>
  );
}
