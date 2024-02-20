import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useDrag } from 'react-use-gesture';
import { useGLTF, Decal, useTexture } from '@react-three/drei';

import state from '../store';

const Headphones = (props) => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/headphones.glb');
    const group = useRef();
    const rotationRef = useRef({ x: 0, y: 0 });

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => {
        easing.dampC(materials.EarC.color, snap.color, 0.25, delta);
        easing.dampC(materials.FabricC.color, snap.color, 0.25, delta);
        easing.dampC(materials.UpperFoamC.color, snap.color, 0.25, delta);

        group.current.rotation.x = rotationRef.current.x;
        group.current.rotation.y = rotationRef.current.y;
    });

    const bind = useDrag(({ offset: [x, y] }) => {
        rotationRef.current.y = x / 100;
        rotationRef.current.x = y / 100;
    });

    const stateString = JSON.stringify(snap);

    return (
        <group key={stateString} {...props} ref={group} dispose={null} {...bind()}>
            <mesh geometry={nodes.Lower.geometry} material={materials.LowerC} position={[0.239, -0.077, 0.155]} rotation={[-0.061, -0.682, -0.253]} scale={0.098} />
            <mesh geometry={nodes.Upper.geometry} material={materials.UpperC} position={[0.014, 0.102, -0.038]} rotation={[-0.063, -0.677, -0.448]} scale={[0.006, 0.006, 0.017]} />
            <mesh geometry={nodes.UpperFoam.geometry} material={materials.UpperFoamC} position={[0.014, 0.109, -0.038]} rotation={[-0.063, -0.677, 0]} scale={0.099}>
                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={4.7}
                        map={fullTexture}
                    >
                        <meshStandardMaterial
                            map={fullTexture}
                            polygonOffset
                            polygonOffsetFactor={-1}
                        />
                    </Decal>
                )}
            </mesh>
            <mesh geometry={nodes.Ear.geometry} material={materials.EarC} position={[0.014, -0.154, -0.021]} rotation={[-0.061, -0.682, -0.253]} scale={0.099} >
                {snap.isFullTexture && (
                    <>
                        <Decal
                            position={[2, 0.3, 0]}
                            rotation={[1.2, 1, 2]}
                            scale={2.1}
                            map={fullTexture}
                        >
                            <meshStandardMaterial
                                map={fullTexture}
                                polygonOffset
                                polygonOffsetFactor={-1}
                            />
                        </Decal>
                        <Decal
                            position={[-2, -0.5, 0]}
                            rotation={[1.2, 1, 2]}
                            scale={2.1}
                            map={fullTexture}
                        >
                            <meshStandardMaterial
                                map={fullTexture}
                                polygonOffset
                                polygonOffsetFactor={-1}
                            />
                        </Decal>
                    </>
                )}

                {snap.isLogoTexture && (
                    <>
                        <Decal
                            position={[2.2, 0.5, 0]}
                            rotation={[0, 1.8, 0]}
                            scale={0.7}
                            map={logoTexture}
                            depthTest={false}
                            depthWrite={true}
                        />
                        <Decal
                            position={[-2.2, -0.7, 0]}
                            rotation={[4.1, -2.05, 4]}
                            scale={0.7}
                            map={logoTexture}
                            depthTest={false}
                            depthWrite={true}
                        />
                    </>
                )}
            </mesh>
            <mesh geometry={nodes.Foam.geometry} material={materials.FoamC} position={[0.017, -0.142, -0.022]} rotation={[-0.061, -0.682, -0.253]} scale={0.099} />
            <mesh geometry={nodes.Fabric.geometry} material={materials.FabricC} position={[0.016, -0.146, -0.025]} rotation={[-0.061, -0.682, -0.253]} scale={0.096} />
        </group>
    );
};


export default Headphones;
