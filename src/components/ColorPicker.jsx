import React from 'react';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';
import { colorPickerAnimation } from '../config/motion';

const ColorPicker = () => {
    const snap = useSnapshot(state);

    return (
        <motion.div
            className='absolute left-full ml-3'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={colorPickerAnimation}
        >
            <SketchPicker
                color={snap.color}
                disableAlpha
                onChange={(color) => (state.color = color.hex)}
                presetColors={[
                    '#000000', // Black
                    '#FFFFFF', // White
                    '#FF0000', // Red
                    '#0000FF', // Blue
                    '#00FF00', // Green
                    '#FFD700', // Gold
                    '#FFA500', // Orange
                    '#800080', // Purple
                    '#FFC0CB', // Pink
                    '#28C6DC', // Cyan
                    '#808080', // Gray
                    '#FFFF00', // Yellow
                ]}
            />
        </motion.div>
    );
};

export default ColorPicker;
