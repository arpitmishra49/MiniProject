let currentPage=1;
let itemsPerPage=0;
let allProducts=[];

let container=document.getElementById("")


fetch("https://dummyjson.com/products")
.then(res=>res.json())
.then(data=>{
    allProducts=data.products;
    if(allProducts.length===0){
        container.innerHTML="<p>No products available </p>";
        prevBtn.disabled=true;
        nextBtn.disabled=true;
        pageInfo.innerHTML="";
        return ;

    }
})
