import moment from 'moment'


export const bufferToBase64 = (bufferFrom) => {
	return Buffer.from(bufferFrom).toString('base64')
}
export const lastItemOfArray = (array) => {
	if (!array.length) {
		return [];
	}
	return array[array.length - 1]
}
export const convertTimestampToHumanTime = (timesTemp) => {
	if (!timesTemp) {
		return '';
	}
	return moment(timesTemp).locale('vi').startOf('seconds').fromNow();
}
