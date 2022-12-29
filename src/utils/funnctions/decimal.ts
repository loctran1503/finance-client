// export const decimalConverter = (value : number) : string =>{
//     const formatter = new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//       });

//     return formatter.format(value)
// }

export const decimalConverterWithoutCurrency = (value : number) : string =>{

  const formatter = new Intl.NumberFormat('en-US');

  return formatter.format(value)
}

