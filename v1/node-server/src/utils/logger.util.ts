import { getDayOfWeekStr, getWeek } from './date.util';

export const getDirnameByWeek = () => {
	const currentWeek = getWeek();

	return `logs/week-${currentWeek}`;
};

export const getDirnameByWeekAndDay = () => {
	const currentWeek = getWeek();
	const currentDay = new Date().getDay();

	return `logs/week-${currentWeek}/day-${currentDay}`;
};

export const getDirnameByYearWeekDay = () => {
	const currentYear = new Date().getFullYear();
	const currentWeek = getWeek();
	const dayOfWeekStr = getDayOfWeekStr().toLowerCase();

	return `logs/${currentYear}/week-${currentWeek}/${dayOfWeekStr}`;
};
