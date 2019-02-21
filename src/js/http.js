 class HTTPlab {
   //Make an http get request
   async get(url){
     const response = await fetch(url);
     const resData = await response.json();
     return resData;
   }

   //Make http Post request
   async post(url, data){
     const response = await fetch(url, {
         method: "POST",
         headers: {
           "Content-type": "application/json"
         },
         body: JSON.stringify(data)
       });
       const resData = await response.json();
       return resData;
   }

   //Make http PUT(update) request
   async put(url, data){
       const response = await fetch(url, {
         method: "PUT",
         headers: {
           "Content-type": "application/json"
         },
         body: JSON.stringify(data)
       });
       const resData = await response.json();
       return resData;
   }
   //Make http DELETE request
   async delete(url){
       const response = await fetch(url, {
         method: "DELETE",
         headers: {
           "Content-type": "application/json"
         },
       });
       const resData = await "Resourse deleted!";
       return resData;
   }
 }

export const http = new HTTPlab();
