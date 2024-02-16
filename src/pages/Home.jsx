import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { headContainerAnimation, headContentAnimation, slideAnimation } from '../config/motion';
import state from '../store';
import { CustomButton } from '../components';
import ClickMe from '../assets/click-me.png';

import laptopIcon from '../assets/laptop-choice-icon.png';
import headphonesIcon from '../assets/headphones-choice-icon.png';
import midiIcon from '../assets/midi-choice-icon.png';

const Home = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation("down")}>
                        <div className='flex'>
                            <img src='/icon_me.png' alt='logo' className='object-contain w-10 h-auto rounded-full shadow-lg' />
                            <a href='https://github.com/reikki7/3d-showcase-web' target='_blank' className='m-2 font-black' >Made by KidKat</a>
                        </div>
                    </motion.header>

                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headContentAnimation}>
                            <h1 className='head-text' style={{ textShadow: '0 0 45px rgba(255, 255, 255, 0.8)' }}>STYLE IT<br className="hidden xl:block" /> UP!</h1>
                        </motion.div>
                        <motion.div {...headContentAnimation} className='flex flex-col gap-5 p-3 bg-white backdrop-blur-sm bg-opacity-70 rounded-xl size-fit md:bg-transparent'>
                            <p className='max-w-md text-base font-normal text-gray-700'>
                                Craft a distinctive and personalized gadgets using our cutting-edge 3D customization tool. <strong>Channel your creativity</strong> to shape a design that resonates with your unique identity!
                            </p>
                        </motion.div>

                        <div className='flex gap-1'>
                            <CustomButton
                                type='filled'
                                title='Style It!'
                                handleClick={() => state.intro = false}
                                customStyles='w-fit px-4 py-2.5 font-bold text-sm'
                            />
                            <img
                                src={ClickMe}
                                alt="Click Me"
                                style={{ width: '105px', height: 'auto', marginTop: '10px' }}
                            />
                        </div>
                        <p className='flex flex-col px-2 bg-white rounded-lg md:px-0 backdrop-blur-sm bg-opacity-70 size-fit md:bg-transparent'><strong>Select a gadget :</strong></p>
                        <div className='flex w-64 h-auto gap-4 -mt-8 md:w-80'>
                            <button
                                className={`duration-150 transform shadow-xl rounded-xl hover:opacity-80 hover:scale-110 ${snap.choice === 'headphones' ? 'opacity-90 scale-105' : 'opacity-50'}`}
                                onClick={() => {
                                    state.choice = 'headphones';
                                }}>
                                <img src={headphonesIcon} alt="headphones" className='rounded-xl' />
                            </button>
                            <button
                                className={`duration-150 transform shadow-xl rounded-xl hover:opacity-80 hover:scale-110 ${snap.choice === 'laptop' ? 'opacity-90 scale-105' : 'opacity-50'}`}
                                onClick={() => {
                                    state.choice = 'laptop';
                                }}>
                                <img src={laptopIcon} alt="laptop" className='rounded-xl' />
                            </button>
                            <button
                                className={`duration-150 transform shadow-xl rounded-xl hover:opacity-80 hover:scale-110 ${snap.choice === 'midi' ? 'opacity-90 scale-105' : 'opacity-50'}`}
                                onClick={() => {
                                    state.choice = 'midi';
                                }}>
                                <img src={midiIcon} alt="midi" className='rounded-xl' />
                            </button>
                        </div>

                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Home;
