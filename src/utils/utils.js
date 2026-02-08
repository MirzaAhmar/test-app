export const convertPricesToNumbers = (products) => {
    return products.map(product => ({
        ...product,
        productPrice: parseFloat(product.productPrice.replace(/[^0-9.-]+/g, ''))
    }));
};