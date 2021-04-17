

// let f = {
//     color: 'red',
//     type: 'hec',
//     discount: '20%',
//     size: '10-20',
//     height: '25',
//     minPrice: 200,
//     maxPrice: 300
// }

export function filterData(data, filter) {

    console.log("Input data" + JSON.stringify(data));
    let resultData = [...data];
    if (filter.color) {
     resultData = resultData.filter(e => e.colors.includes(filter.color));
    }

    if(filter.type){
        resultData = resultData.filter(e => e.productType === filter.type);
    }

    
    if(filter.discount){
        resultData = resultData.filter(e => e.discounts === filter.discount);
    }

    if(filter.size){
        resultData = resultData.filter(e => e.sizes === filter.size);
    }
    
    if(filter.height){
        resultData = resultData.filter(e => e.height === filter.height);
    }
     
    if(filter.minPrice ){
        resultData = resultData.filter(e => e.price >= filter.minPrice);
    }

    if(filter.maxPrice ){
        resultData = resultData.filter(e => e.price <= filter.maxPrice);
    }

    console.log("result data " + JSON.stringify(resultData));
    return resultData;
}

