import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function GlassOrb({
  position,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number]
  scale?: number
  speed?: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.y = position[1] + Math.sin(t) * 0.18
    ref.current.rotation.x = t * 0.2
    ref.current.rotation.y = t * 0.35
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        resolution={192}
        transmission={0.92}
        roughness={0.15}
        thickness={1.2}
        ior={1.4}
        chromaticAberration={0.04}
        distortion={0.12}
        distortionScale={0.2}
        temporalDistortion={0.08}
        color="#9fd0ff"
        attenuationColor="#163a5c"
        attenuationDistance={0.9}
      />
    </mesh>
  )
}

function OrbitRing() {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.12
    ref.current.rotation.x =
      Math.PI / 2.6 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05
  })

  return (
    <mesh ref={ref} scale={[2.6, 2.6, 2.6]}>
      <torusGeometry args={[1, 0.007, 12, 96]} />
      <meshBasicMaterial color="#5eb8ff" transparent opacity={0.4} />
    </mesh>
  )
}

function SoftGlowOrb({
  position,
  scale,
}: {
  position: [number, number, number]
  scale: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.1 + position[0]) * 0.12
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#6ec0ff"
        emissive="#2a6aaa"
        emissiveIntensity={0.85}
        roughness={0.2}
        metalness={0.35}
        transparent
        opacity={0.55}
      />
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.15} color="#d7ecff" />
      <pointLight position={[-2, 1, 3]} intensity={2} color="#5eb8ff" />
      <pointLight position={[3, -1, -2]} intensity={0.7} color="#ffffff" />

      <Float speed={1.15} rotationIntensity={0.25} floatIntensity={0.35}>
        <GlassOrb position={[0.15, 0.05, 0]} scale={0.52} speed={0.9} />
      </Float>

      <SoftGlowOrb position={[-1.45, 0.65, -0.35]} scale={0.18} />
      <SoftGlowOrb position={[1.55, -0.45, 0.25]} scale={0.13} />
      <SoftGlowOrb position={[1.05, 0.8, -0.7]} scale={0.1} />
      <SoftGlowOrb position={[-0.85, -0.55, 0.55]} scale={0.08} />

      <OrbitRing />
      <Sparkles
        count={36}
        scale={[5.5, 3.8, 3.5]}
        size={1.4}
        speed={0.3}
        color="#8ec8ff"
        opacity={0.5}
      />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
