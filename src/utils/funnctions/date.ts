export const getTimeFromDate =(date : Date) : string  =>{
    const hours = new Date(date).getHours();
    const minutes =  new Date(date).getMinutes();
    return `${hours}:${minutes} hôm nay`
}