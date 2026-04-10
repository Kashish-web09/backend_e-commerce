
const cartItem=document.getElementById("cartItems");
const cartTotal=document.getElementById("cartTotal");

function displayCart(cart){
    cartItem.innerHTML="";
    let total=0;
    cart.forEach(product=>{
        cartItem.innerHTML+=`
        `
    })
}
    const btn=document.getElementById('order-btn');
    btn.addEventListener('click',()=>{
        alert("Order placed successfully!")
    })
    const zidcode=document.getElementById('inputZip');
    const states=document.getElementById('inputState');
const zipMap={
    "127021":"Haryana",
    "110001":"Delhi",
    "400001":"Mumbai",
    "500001":"Hyderabad"
}
zidcode.addEventListener('input',()=>{
const zip=zidcode.value;
if(zipMap[zip]){
    states.value=zipMap[zip];
}
})


