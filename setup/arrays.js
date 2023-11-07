export const remove = (idx, arr) => {
    console.log(arr.splice(idx, 1));
    return arr;
}