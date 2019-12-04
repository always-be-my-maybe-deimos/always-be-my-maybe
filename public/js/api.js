import $ from 'jquery'
// import axios from 'axios'

export const getItems = () => {
    return fetch('/api/cart')
        .then(res => res.json())
        .catch(()=> console.log(`GET ERROR`))
}

export const postItem = (item) => {
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }
    return fetch('/api/cart', config)
}

export const deleteItem = id => {
    console.log("id: ", id)
    let config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`/api/cart/${id}`, config)
        .then((res)=> res.json())
        .then((data)=> console.log("dataaaa", data))
        .catch((e)=> console.log(e))

}