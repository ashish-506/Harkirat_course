const express = require('express');
const app = express();
app.use(express.json());
const user = [{
    name:"Ashish",
    kidneys:[
        {
            healthy:false
        },
        {
            healthy:true
        },{
            healthy:true
        }
]
}]
app.get("/",(req,res)=>{
    const arr = user[0].kidneys;
    let fine = 0,total = arr.length;
    for(let i = 0; i < arr.length; i++){
        if(arr[i].healthy) {fine++;}
    }
    const unfine = total - fine;
    res.json({
        total,
        fine,
        unfine
    })

})
app.post("/",(req,res)=>{
    // isko call krte time app.use(express.json()); use krna padta hai pta nahi kyu prr krna padta hai

    const ishealthy = req.body.ishealthy;
    user[0].kidneys.push({healthy:ishealthy});
    res.json({msg:'done!'});
})
// kisi bhi request method me(put,post,get,delete) jbtk res.send().. nahi hoga request wahi atak jaaega

app.put('/',(req,res)=>{
    for(let ked of user[0].kidneys){
        ked.healthy = true;
    }
    res.json({msg:"all good"});
})

app.delete('/',(req,res)=>{
    const arr = [];
    for(let ked of user[0].kidneys){
        if(ked.healthy) arr.push(ked);
    }
    user[0].kidneys = arr;
    res.json({
        msg:"all bad kidneys got removed"
    })
})
app.listen(3939);