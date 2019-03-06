export const storeProducts = () => {
    fetch(`https://coffee-code-6868.herokuapp.com/products`, {
        method: 'GET'
    })
    .then(result => result.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
}