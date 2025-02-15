import axios from 'axios';

const commonConfig = {};

export const qldtInstance = axios.create({
	...commonConfig,
	baseURL: 'https://qldt.vlute.edu.vn/VLUTE-Web',
});

export const emsInstance = axios.create({
	...commonConfig,
	baseURL: 'https://ems.vlute.edu.vn',
});
