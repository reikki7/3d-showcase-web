import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import { headContainerAnimation, headContentAnimation, slideAnimation } from '../config/motion';
import state from '../store';
import { CustomButton } from '../components';
import ClickMe from '../assets/click-me.png';

const Home = () => {
    const snap = useSnapshot(state);

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation("down")}>
                        <div className='flex'>
                            <img src='/icon_me.png' alt='logo' className='object-contain w-10 h-auto rounded-full shadow-lg' />
                            <a href='https://github.com/reikki7?tab=repositories' target='_blank' className='m-2 font-black'>Made by KidKat</a>
                        </div>
                    </motion.header>

                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headContentAnimation}>
                            <h1 className='head-text' style={{ textShadow: '0 0 45px rgba(255, 255, 255, 0.8)' }}>STYLE IT<br className="hidden xl:block" /> UP!</h1>
                        </motion.div>
                        <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                            <p className='max-w-md text-base font-normal text-gray-500' style={{ textShadow: '0 0 45px rgba(255, 255, 255, 0.8)' }}>
                                Craft a distinctive and personalized pair of headphones using our cutting-edge 3D customization tool. <strong>Channel your creativity</strong> to shape a design that resonates with your unique identity!
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
                                alt="Click Me Image"
                                style={{ width: '105px', height: 'auto', marginTop: '10px' }}
                            />
                        </div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default Home;
