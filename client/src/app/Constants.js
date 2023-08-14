export const PAGE_SIZE = 10;
export function discountedPrice(item){
    return Math.round((1-item.discountPercentage/100)*item.price);
}
