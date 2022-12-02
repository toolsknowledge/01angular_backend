const express = require("express");
const app = express();
const mongodb = require("mongodb");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const sambaIT = mongodb.MongoClient;
app.get("/products",(req,res)=>{
    sambaIT.connect(`mongodb+srv://admin:admin@01angular.t3mcykm.mongodb.net/?retryWrites=true&w=majority`,(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angular_database");
            db.collection("products").find().toArray((err,array)=>{
                if(err) throw err;
                else{
                    res.json(array);
                }
            })
        }
    })
});
app.get("/products/:id",(req,res)=>{
    sambaIT.connect(`mongodb+srv://admin:admin@01angular.t3mcykm.mongodb.net/?retryWrites=true&w=majority`,(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angular_database");
            db.collection("products").findOne({"p_id":parseInt(req.params.id)},(err,result)=>{
                if(err) throw err;
                else{
                    if(result == undefined || result == null){
                            res.json({"msg":"record not available"});
                    }
                    else{
                        let keys = Object.keys(result);
                        if(keys.length>0){
                            res.json(result);
                        }
                    }
                }
            })
        }
    });
});


app.post("/insert",(req,res)=>{
    sambaIT.connect(`mongodb+srv://admin:admin@01angular.t3mcykm.mongodb.net/?retryWrites=true&w=majority`,
                                                        (err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angular_database");
            db.collection("products").insertOne({"p_id":req.body.p_id,"p_name":req.body.p_name,"p_cost":req.body.p_cost},(err,result)=>{
                if(err) throw err;
                else if(result.acknowledged){
                    res.json({"msg":"record inserted successfully"});
                }
            })
        }
    })
});

app.put("/update",(req,res)=>{
    sambaIT.connect(`mongodb+srv://admin:admin@01angular.t3mcykm.mongodb.net/?retryWrites=true&w=majority`,(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angular_database");
            db.collection("products").updateOne({"p_id":req.body.p_id},{$set:{"p_name":req.body.p_name,"p_cost":req.body.p_cost}},(err,result)=>{
                if(err) throw err;
                else if(result.modifiedCount == 1){
                    res.json({"msg":"record updated successfully"});
                }else{
                    res.json({"msg":"record not updated successfully"});
                }
            })
        }
    })
});


app.delete("/delete",(req,res)=>{
    sambaIT.connect(`mongodb+srv://admin:admin@01angular.t3mcykm.mongodb.net/?retryWrites=true&w=majority`,(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angular_database");
            db.collection("products").deleteOne({"p_id":req.body.p_id},(err,result)=>{
                if(err) throw err;
                else if(result.deletedCount == 1){
                    res.json({"msg":"record deleted successfully"});
                 }else{
                     res.json({"msg":"record not deleted successfully"});
                 }
            })
        }
    })    
})


app.listen(8080,()=>{
    console.log("server listening the port no 8080");
});

