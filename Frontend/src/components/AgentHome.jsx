import React from 'react';
import { categories } from '../data/data.js';

const AgentHome = () => {
  console.log(categories);
  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        AGENT
      </h1>
    </div>
  );
};

export default AgentHome;