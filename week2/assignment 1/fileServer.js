/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

/*
  files read krna samjha, (err,data) ka use seekha aur ye jaana ki agr mai koi asynchronous function call krta hu
  to mujhe callback function me uski value bhejni hoti hai unlike synchronous function jisme value return hoke aati hai
  jaise agr mai krta hu 
  fs.readFileSync(filepath,"utf-8") to mai iske return hue data ko ek variable me store krr sakta hu something like
  const data = fs.readFileSync(filepath,"utf-8")
  prr agr mai fs.readFile(filepath,"utf-8") ko ek variable me store krna chahu to vo hoga hi nahi 
  bcz(my reasoning)--> jb ek async funtion call kiya jaata hai to uska return data callstack khali hone ke baad return hota hai
  prr data variable to mai pehle hi initialize krr chuka hu to ye poore program me 'undefined' se in initialized rhega
  aur ye baat kisi bhi async function ke liye true hai
  baaki to syntax hi hai read write ka usko jb mnn tb revise krlo
  path.join ka use bhi seekha bcz windows me file path me \ aata hai aur linux based systems me / to bss inko ',' se replace kr dete hai
  '__dirname' se mai current folder ka path jaan sakta hu
  code dekhke samajh lena baaki
 */
app.get('/files',(req,res)=>{
  const filepath = path.join(__dirname,"files"); // ye aisa hi hai jaise filepath = curr_path/files
  fs.readdir(filepath,(err,folder)=>{
    if(err){
      return res.status(500).send('No folder exist');
    }
    res.status(200).json(folder);
  });
});
/**
  get request ke parameter ko handle krne kya naya tareeka mila 
  url me / ke baad : laga dene se ye ek parameter ki trh ho jaata hai 
  jaise /file/:naam me use hua hai
  iss 'naam' ki value ko use krne ke liye 'param' ka use hota hai 'query' ki jagah

 */

app.get('/file/:naam',(req,res)=>{
  const filename = req.params.naam;
  const filepath = path.join(__dirname,"files",filename); // filepath = curr_path/files/req.params.naam

  fs.readFile(filepath,"utf-8",(err,data)=>{
    if(err){
      return res.status(404).send("File not found");
    }
    res.status(200).send(data);
  })
})
// agr user ne koi bhi invalid url type kiya to ye neeche wala code use handle krr lega
// iske baare me aur padha jaa sakta hai
app.use((req, res) => {
    res.status(404).send("Route not found");
});
// ye to test cases run krne ke liye likha tha, iske bina agr test case run kiya to server 3000 pr listen krna start kr dega
// aur doosre test cases ke liye btane lagega port 3000 is busy
if (require.main === module) {
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}

module.exports = app; // ye line pta nahi kya krti hai