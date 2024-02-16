import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/laptop-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.screen.geometry} material={materials.screen} position={[0, -0.09, 0.048]} rotation={[1.942, 0.011, 2.224]} scale={0.154} />
      <mesh geometry={nodes.body.geometry} material={materials.body} position={[0, -0.09, 0.048]} rotation={[1.942, 0.011, 2.224]} scale={0.154} />
      <mesh geometry={nodes.webcam.geometry} material={materials.webcam} position={[0, -0.09, 0.048]} rotation={[1.942, 0.011, 2.224]} scale={0.154} />
      <group position={[0, -0.09, 0.048]} rotation={[1.942, 0.011, 2.224]} scale={0.154}>
        <mesh geometry={nodes.kayboard.geometry} material={materials.keycaps} />
        <mesh geometry={nodes.kayboard_1.geometry} material={materials.glow} />
      </group>
    </group>
  )
}

useGLTF.preload('/laptop-transformed.glb')
