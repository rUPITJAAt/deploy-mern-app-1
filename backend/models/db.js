const mongoose=require("mongoose");


mongoose.connect('mongodb+srv://ritikchimni02:c2nd8VhUnWZVJSB@cluster0.ixb5sy9.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0')
        .then(
            ()=>{
                console.log('MongoDb Connected...');
            }
        ).catch((e)=>{
            console.log('MongoDb Connection error:',e);
        })