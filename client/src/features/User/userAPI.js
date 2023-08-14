// A mock function to mimic making an async request for data
export function fetchLoggedInUser(){
  return new Promise( async (resolve)=>{
    const response = await fetch("/user/");
    const data = await response.json();
    resolve({data});
  })
}
export function fetchOrders(){
  return new Promise (async (resolve)=>{
    const response = await fetch("/user/order/");
    const data = await response.json();
    resolve({data});
  })
}

export function updateUser(userdata){
  return new Promise(async (resolve)=>{
    const response = await fetch("/user/", {
      method: "PATCH",
      body: JSON.stringify(userdata),
      headers: {'content-type': "application/json"}
    })
    const data = await response.json();
    resolve({data});
  })
}