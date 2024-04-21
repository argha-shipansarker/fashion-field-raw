export const urlHelper = (slug, type) => {
    // console.log(type);
    if (type === 'category')
        return `/main-category/${slug}`

    if (type === 'sub-category')
        return `/sub-category/${slug}`

    if (type === 'product-category')
        return `/category/${slug}`

    if (type === 'brand')
        return `/brand/${slug}`

    if (type === 'product')
        return `/product/${slug}`

    if (type === 'store')
        return `/store/${slug}`
    
    if (type === 'page')
        return `/content-page/${slug}`


    return `${slug}`;
}