const kafkaConfig = require("./kafkaConfig")

const sendMessageToKafka = async (req,res)=>{
    console.log(req.body)
    try {
        const {message} =req.body;
        const kafka = new kafkaConfig();
        const messages=[{value:message,partition:0}];
        kafka.produce("Logs7",messages);

        res.status(200).json({
            status:"ok",
            message:"Message successfully send!"
        })


    } catch (error) {
        console.log("Error ", error)
    }
}

module.exports=sendMessageToKafka;