const express = require('express');
const app = express();
const zod = require('zod');

const schema1 = zod.array(zod.number());
app.use(express.json());
/**
  create a schema of object 
  {
    email: should be a string and email type
    password: should have atleast 8 length
    country: either "IN" or "US"
    kidney: array of numbers
  }
 */

const schema2 = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country:zod.literal("IN").or(zod.literal("US")),
    kidney:zod.array(zod.number())
})
app.post('/',(req,res)=>{
    const kidney = req.body.kidney;
    const response = schema1.safeParse(kidney);
    if(!response.success){
        res.status(403).json({
            msg:"Wrong input"
        })
        return;
    }

    res.send("all ok");
})
app.listen(4000);