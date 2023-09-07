const express = require("express")
const PORT = process.env.PORT || 8000
const app= express();
const cors=require("cors")
const bodyParser=require("body-parser")
const kafkaConfig = require("./kafkaConfig");
const sendMessageToKafka=require("./controller")
app.use(cors());
app.use(bodyParser.json());

const kafka = new kafkaConfig();


app.use("/sendMessage",sendMessageToKafka)



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)
    
    kafka.consume("test7","Logs7",(value)=>{
    console.log(`Receive message: `, value)
})
})