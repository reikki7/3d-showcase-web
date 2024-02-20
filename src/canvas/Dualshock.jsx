import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useDrag } from 'react-use-gesture';
import { useGLTF, Decal, useTexture } from '@react-three/drei';

import state from '../store';

const Dualshock = (props) => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/dualshock.glb');
    const group = useRef();
    const rotationRef = useRef({ x: 0, y: 0 });

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    useFrame((state, delta) => {
        easing.dampC(materials.UpperBodyC.color, snap.color, 0.25, delta);
        easing.dampC(materials.UnderBodyC.color, snap.color, 0.25, delta);
        easing.dampC(materials.smallStuffC.color, snap.color, 0.25, delta);

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
            <mesh geometry={nodes.UpperBody.geometry} material={materials.UpperBodyC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} >
                {snap.isFullTexture && (
                    <>
                        <Decal
                            position={[0, 0, -0.8]}
                            rotation={[1.5155, 0.0001, 3.14]}
                            scale={10.9}
                            map={fullTexture}>
                            <meshStandardMaterial
                                map={fullTexture}
                                polygonOffset
                                polygonOffsetFactor={-1} />
                        </Decal>
                    </>
                )}
            </mesh>
            <mesh geometry={nodes.UnderBody.geometry} material={materials.UnderBodyC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} >
                {snap.isFullTexture && (
                    <>
                        <Decal
                            position={[0, 0, -0.8]}
                            rotation={[1.5155, 0.0001, 3.14]}
                            scale={10.9}
                            map={fullTexture}>
                            <meshStandardMaterial
                                map={fullTexture}
                                polygonOffset
                                polygonOffsetFactor={-1} />
                        </Decal>
                    </>
                )}
            </mesh>
            <mesh geometry={nodes.RL.geometry} material={materials.RLC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} />
            <mesh geometry={nodes.smallStuff.geometry} material={materials.smallStuffC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} />
            <mesh geometry={nodes.blackBottom.geometry} material={materials.blackBottomC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} >
                {snap.isLogoTexture && (
                    <Decal
                        position={[1.35, 2.6, -2.6]}
                        rotation={[1.6, 0, 0]}
                        scale={0.47} map={logoTexture}
                        depthTest={false}
                        depthWrite={true} />
                )}
            </mesh>
            <mesh geometry={nodes.BlueStripe.geometry} material={materials.BlueStripeC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} />
            <mesh geometry={nodes.pad.geometry} material={materials.padC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} />
            <mesh geometry={nodes.Analogue.geometry} material={materials.AnalogueC} position={[0.028, 0.082, -0.176]} rotation={[1.049, -0.581, -2.656]} scale={-0.06} />
        </group>
    );
};


export default Dualshock;
