const container=document.getElementById("productContainer");
function generateStars(rating){
    let stars="";
    for(let i=0;i<5;i++){
        if(rating>=i){
            stars+=`<i class="fa-solid fa-star"></i>`;
        }else if(rating>=i-0.5){
            stars+=`<i class="fa-solid fa-star-half"></i> `
        }else{
            stars+=`<i class="fa-regular fa-star"></i>`
        }
    }
    return stars;
}
function displayProduct(productList){
    container.innerHTML="";
    productList.forEach(product=>{
        container.innerHTML+= `<div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                    <div class="card h-100">
                    
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-body">
                            <h6 class="card-title">${product.name}</h6>
                            <div class="rating mb-2">
                                ${generateStars(product.rating)}
                            </div>
                            <p class="price">$${product.price.toFixed(2)}</p>
                            <button class="btn btn-warning w-100 btn-sm"  onclick="addToCart(${product.id})">
                                Add to Cart
                            </button>
                            <button class="btn btn-info w-100 btn-sm mt-2" onclick="addToWishlist(${product.id})">
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>`;
    });
}
displayProduct(products);
const containers = document.getElementById("productContainer");
const productCount = document.getElementById("productCount");

function updateProductCount() {
    const count = containers.children.length;
    productCount.textContent = count + " Products Found";
}
updateProductCount();

const search=document.getElementById("search-product");

function searchProduct(name){
    let product = products.filter(p => 
        p.name.toLowerCase().includes(name.toLowerCase())
    );
    return product;
}


search.addEventListener("input", function () {
    let value = this.value;

    let result = searchProduct(value);

displayProduct(result);
updateProductCount();
});

const filterBtn=document.getElementById("applyFilter");
const categoryProduct = document.querySelectorAll('.category-filter');

categoryProduct.forEach(cp => {

});


const rangePrice = document.getElementById("price-Range");
let selectedPrice = rangePrice.value;
const sorting=document.getElementById("sort");
let selectedSort=sorting.value
sorting.addEventListener('change',()=>{
    selectedSort=sorting.value
handleFilter();
})

rangePrice.addEventListener('input', () => {
    selectedPrice = rangePrice.value; 
});

function handleFilter() {

    let selectedCategories = [];

    // ✅ collect sizes

    // ✅ collect categories
    categoryProduct.forEach(cp => {
        if (cp.checked) {
            selectedCategories.push(cp.value);
        }
    });

    let filteredProducts = products.filter(p => 
        (selectedCategories.length === 0 || selectedCategories.includes(p.category)) &&
        (Number(p.price) <= Number(selectedPrice)));
        if(selectedSort==='Price: Low to High'){
            filteredProducts.sort((a,b)=>a.price-b.price);
        }else if(selectedSort==='Price: High to Low'){
            filteredProducts.sort((a,b)=>b.price-a.price);
        }else if(selectedSort==='Newest'){
            filteredProducts.sort((a,b)=>b.id-a.id)
        }

    displayProduct(filteredProducts);
    updateProductCount();
}
filterBtn.addEventListener('click',handleFilter);
let cartCount=document.getElementById("cartCount");
let cart=[];
let count=0;
 function addToCart(id){
const product=products.find(p=>p.id===id);
    if(product){
        cart.push(product);
        count++;
        cartCount.innerText=cart.length;
        alert(`${product.name} added to your cart`)

    }else{
        alert("Product not found!")
    }
}
let wishlitCount=document.getElementById('wishCount');
let wishlist=[];
let countWish=0;
function addToWishlist(id){
    const product=products.find(p=>p.id===id);
    if(product){
        wishlist.push(product);
        countWish++;
        wishlitCount.innerText=countWish;
            alert(`${product.name} added to wishlist`)
            

    }else{
                alert("Product not found!")

    }
}