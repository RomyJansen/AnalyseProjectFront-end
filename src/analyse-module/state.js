// state.js
import { useState } from 'react';

// Define the static variable
let count = 2025;

// Function to increment the count
export const incrementJaar = () => {
    if(count < 2050) count++;
};


export const decreaseJaar = () => {
    if (count > 2023) count--;
};

// Function to get the current count
export const getJaar = () => {
    return count;
};
