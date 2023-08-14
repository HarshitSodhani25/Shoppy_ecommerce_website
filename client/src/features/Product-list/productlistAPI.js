export function fetchProductByFilter(filter, sort, pagination, admin) {
  let queryString = "";

  for(let key in filter){
    queryString += `${key}=${filter[key]}&`;
  }
  
  for(let key in sort){
    queryString += `_sort=${key}&_order=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) =>{
    const response = await fetch("/products?"+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data: {products: data, totalItems: +totalItems}});
  }
  );
}

export function fetchCategories(){
  return new Promise(async(resolve) => {
    const response = await fetch("/categories")
    const data = await response.json()
    resolve({data})
  })
}
export function fetchBrands(){
  return new Promise(async(resolve) => {
    const response = await fetch("/brands")
    const data = await response.json()
    resolve({data})
  })
}

export function fetchProductById(productid){
  return new Promise(async (resolve)=>{
    const response = await fetch("/products/"+productid)
    const data = await response.json();
    resolve({data});
  })
}

export function createProduct(product){
  return new Promise(async (resolve)=>{
    const response = await fetch("/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {'Content-Type': "application/json"}
    });
    const data = await response.json()
    resolve({data});
  })
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      '/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
