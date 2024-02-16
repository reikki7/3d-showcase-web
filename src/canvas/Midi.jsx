import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useTexture, useGLTF } from '@react-three/drei'

import state from '../store'

const Headphones = (props) => {

    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF('/midi.glb')

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => {
        easing.dampC(materials.base.color, snap.color, 0.25, delta);
    });


    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString}>
            <group {...props} dispose={null}>
                <mesh geometry={nodes.base.geometry} material={materials.base} position={[0.013, 0.023, 0.028]} rotation={[0.755, 0.644, -0.176]} scale={1.409} >
                    {snap.isFullTexture && (
                        <>
                            <Decal
                                position={[0, 0, 0]}
                                rotation={[1.2, 0, 0]}
                                scale={0.526}
                                map={fullTexture}>
                                <meshStandardMaterial
                                    map={fullTexture}
                                    polygonOffset
                                    polygonOffsetFactor={-1} />
                            </Decal>
                        </>
                    )}
                    {snap.isLogoTexture && (
                        <Decal
                            position={[0.247, 0.021, -0.075]}
                            rotation={[1.5, 3.1, -3]}
                            scale={0.023} map={logoTexture}
                            depthTest={false}
                            depthWrite={true} />
                    )}
                </mesh>
                <mesh geometry={nodes.keys.geometry} material={materials.keys} position={[0.021, 0.068, 0.062]} rotation={[0.755, 0.644, -0.176]} scale={[0.373, 0.032, 0.127]} />
                <mesh geometry={nodes.keysBlack.geometry} material={materials.keysBlack} position={[0.191, 0.124, -0.191]} rotation={[0.755, 0.644, -0.176]} scale={0.00871} />
                <mesh geometry={nodes.buttons2.geometry} material={materials.buttons2} position={[0.013, 0.023, 0.028]} rotation={[0.755, 0.644, -0.176]} scale={1.409} />
                <mesh geometry={nodes.cube.geometry} material={materials.cube} position={[0.013, 0.023, 0.028]} rotation={[0.755, 0.644, -0.176]} scale={1.409} />
            </group>
        </group >
    )
}

export default Headphones