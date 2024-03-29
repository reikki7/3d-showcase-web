import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'

import { ColorPicker, CustomButton, FilePicker, Tab } from '../components'

const Customizer = () => {

    const snap = useSnapshot(state)

    const [file, setFile] = useState('')

    const [activeEditorTab, setActiveEditorTab] = useState('')
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: true,
    })

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />
            case 'filepicker':
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            default:
                return null;
        }
    }


    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;
        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab);
        }
    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isFullTexture = true;
                state.isLogoTexture = false;
                break;
        }

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }

        })
    }

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab('');
        })
    }

    const handleColorPickerClick = () => {
        setActiveEditorTab((prevTab) => (prevTab === 'colorpicker' ? '' : 'colorpicker'));
    };

    const handleFilePickerClick = () => {
        setActiveEditorTab((prevTab) => (prevTab === 'filepicker' ? '' : 'filepicker'));
    };


    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className='absolute top-0 left-0 z-10' {...slideAnimation('left')}
                    >
                        <motion.div
                            className='flex items-center min-h-screen'
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            variants={fadeAnimation}>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => {
                                            if (tab.name === 'colorpicker') handleColorPickerClick();
                                            else if (tab.name === 'filepicker') handleFilePickerClick();
                                            else setActiveEditorTab(tab.name);
                                        }}
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className='absolute z-10 top-5 right-5' {...fadeAnimation}
                    >
                        <CustomButton
                            type='filled'
                            title='Go Back'
                            handleClick={() => {
                                state.intro = true;
                                setActiveEditorTab('')
                            }}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                    <motion.div
                        className='filtertabs-container' {...slideAnimation('up')}
                    >
                        {FilterTabs.map((tab) => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer