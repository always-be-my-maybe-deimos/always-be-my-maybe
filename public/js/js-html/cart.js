import $ from 'jquery'
import { getItems, deleteItem } from '../api'

$(document).ready(function () {
    let cartID = []
    let cartTotal = 0
    //! handles
    let wrapper = $('#card-wrapper')
    
    //! GET CART
    const requestCart = () => {
        getItems()
            .then(data =>{
                $('#num').html(data.length)
                $('#cart-amount').html(`${data.length} Items in Cart`)
                console.log("data", data)
                wrapper.html('')
                data.forEach((d,i)=> {
                    cartID.push(d.id)
                    cartTotal += d.price
                    let html =
                        `  <div class="col s12 m6 l4">
    <div class="card horizontal">
      <div class="card-image">
        <img src="../../images/Screen%20Shot%202019-12-03%20at%201.57.03%20PM.png">
      </div>
      <div class="card-stacked">
        <div class="card-content">
        <p class="center">${d.color}</p>
        <hr>
          <p class="center">${d.description}</p>
          <p class="center">${d.price}</p>
        </div>
        <div class="card-action">
<a class="btn-floating btn-small waves-effect waves-light grey lighten-4 right"
id="delete-${d.id}"><i class="material-icons">clear</i></a>
       </div>
      </div>
    </div>
  </div>`
                    wrapper.append(html)
                    
                })
                addEventListener(cartID, data)
                
                
            })
    }
    
    //! add click events
    const addEventListener = (arr, cart) => {
        arr.forEach(a => {
            $(`#delete-${a}`).click(function () {
                handleDelete(a, cart)
            })
        })
    }
    
    
    //! handle the delete
    const handleDelete = (id, arr) => {
        arr.forEach(a => {
            if(a.id == id){
                let answer = confirm(`Are you sure you want to remove this item from your cart?`)
                if(answer) deleteItem(id)
                    .then((data)=>  {
                        console.log("data", data)
                        getItems()
                    })
                    .catch(()=> console.log("ERROR"))            }
        })
        
    }
    
    
    //! original function
    requestCart()
    
})