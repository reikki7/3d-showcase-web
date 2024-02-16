import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center } from '@react-three/drei';
import Headphones from './Headphones';
import Laptop from './Laptop';
import Midi from './Midi';
import CameraRig from './CameraRig';
import { useSnapshot } from 'valtio';
import state from '../store';

const MemoizedHeadphones = React.memo(Headphones);
const MemoizedLaptop = React.memo(Laptop);
const MemoizedMidi = React.memo(Midi);

const CanvasModel = () => {
    const snap = useSnapshot(state);
    let modelToRender = null;

    switch (snap.choice) {
        case 'headphones':
            modelToRender = <MemoizedHeadphones />;
            break;
        case 'laptop':
            modelToRender = <MemoizedLaptop />;
            break;
        case 'midi':
            modelToRender = <MemoizedMidi />;
            break;
        default:
            break;
    }

    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            className='w-full h-full max-w-full transition-all ease-in'
        >
            <ambientLight intensity={0.5} />
            <Environment preset='city' />

            <CameraRig>
                <Center>
                    {modelToRender}
                </Center>
            </CameraRig>
        </Canvas>
    );
}

export default CanvasModel;
