import moment from "jalali-moment";



const convertToPersain = (date) => {
    const result = moment(date, 'YYYY/MM/DD hh:mm').locale('fa').format('YYYY/MM/DD hh:mm');
    return result
}


export { convertToPersain }