import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CustomButton from './CustomButton';
import { filePickerAnimation } from '../config/motion';

const FilePicker = ({ setFile, readFile }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <motion.div
            className='filepicker-container'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={filePickerAnimation}
        >
            <div className='flex flex-col flex-1'>
                <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                />
                <label htmlFor='file-upload' className='filepicker-label'>
                    Upload File
                </label>
                <p className='mt-2 mb-1 text-xs text-gray-500 truncate'>
                    {imagePreview ? 'Image selected' : 'No file selected'}
                </p>
            </div>
            {imagePreview && (
                <div className='image-preview-container'>
                    <img
                        src={imagePreview}
                        alt='File Preview'
                        className='image-preview'
                    />
                </div>
            )}
            <p className='-mb-1 text-xs text-center text-gray-500'>
                Set uploaded image as
            </p>
            <div className='flex flex-wrap gap-1 mt-4'>
                <CustomButton
                    type='outline'
                    title='Logo'
                    handleClick={() => readFile('logo')}
                    customStyles='text-xs flex-1'
                />
                <CustomButton
                    type='filled'
                    title='Texture'
                    handleClick={() => readFile('full')}
                    customStyles='text-xs flex-1'
                />
            </div>
        </motion.div>
    );
};

export default FilePicker;
