import axios from 'axios';

const commonConfig = {};

export const qldtInstace = axios.create({
	...commonConfig,
	baseURL: 'https://qldt.vlute.edu.vn',
});

export const emsInstance = axios.create({
	...commonConfig,
	baseURL: 'https://ems.vlute.edu.vn',
});
