// A mock function to mimic making an async request for data
export function createCredential(userData) {
  return new Promise(async (resolve, reject) =>{
      const response = await fetch("/auth/signup", {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {"content-type": "application/json"}
      })
      if(response.status===201){
        const data = await response.json();
        resolve({data});
      }
    else{
      reject({message: "User already exist, try to login"})
    }
  });
}
export function validateCredential(userData) {
  return new Promise(async (resolve, reject)=>{
    const response = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {"content-type": "application/json"}
    })
    if(response.status===200){
      const data = await response.json();
      resolve({data});
    }else
      reject({message: "Invalid Credentials"})
  })
}
export function checkAuth() {
  return new Promise(async (resolve, reject)=>{
    const response = await fetch("/auth/check")
    if(response.status===200){
      const data = await response.json();
      resolve({data});
    }else
      reject({message: "Invalid Credentials"})
  })
}

export function signOut(){
  return new Promise( (resolve)=>{
    resolve({data: "success"});
  })
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password-request', {
        method: 'POST',
        body: JSON.stringify({email}),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}