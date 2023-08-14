// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {"content-type": "application/json"}
    });
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchAllOrders(sort, pagination){
  let queryString="";
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  return new Promise(async (resolve)=>{
    const response = await fetch("/orders?"+queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get('X-Total-Count');
    resolve({data: {orders: data, totalOrders: +totalOrders}})
  })
}
export function updateOrder(order){
  return new Promise(async(resolve)=>{
    const response = await fetch("/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {"content-type": "application/json"}
    })
    const data = await response.json();
    resolve({data});
  })
}