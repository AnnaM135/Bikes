
export function getAllFilters(data) {

    return {
        colors: getColors(data),
        types: getTypes(data),
        discounts: getDiscounts(data),
        sizes: getSizes(data),
        heights: getHeights(data)

    }
}

function getColors(data) {

    let colors = data
        .map(e => e.colors)
        .flatMap(e => e.split(','))

    return [...new Set(colors)];

}

function getTypes(data) {
    let types = data.map(e => e.productType);
    return [...new Set(types)];
}

function getDiscounts(data) {
    let disc = data.map(e => e.discounts);
    return [...new Set(disc)];
}

function getSizes(data) {
    let resData = data.map(e => e.sizes)
        .flatMap(e => e.split(','))

    return [...new Set(resData)];
}

function getHeights(data) {
    let resData = data.map(e => e.height)
        .flatMap(e => e.split(','))

    return [...new Set(resData)];
}
