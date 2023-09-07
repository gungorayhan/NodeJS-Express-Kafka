const {Kafka} = require("kafkajs")


class kafkaConfig {
    constructor(){
        this.kafka=new Kafka({
            clientId:"nodejs-kafka",
            brokers:["192.168.4.165:9092"]
        });
    }

    async createTopics(topic_name,numpartition=1){
       try {
        this.admin=this.kafka.admin();
        await this.admin.connect();
        await this.admin.createTopics({
            topics:[{
                topic:topic_name,
                numPartitions:numpartition
            }]
        })
        await this.admin.disconnect();
       } catch (error) {
        
       } finally{
        process.exit(0)
       }
    }

    async produce(topic_name,messages){
        try {
            this.producer=this.kafka.producer();
            await this.producer.connect();
            await this.producer.send({
                topic:topic_name,
                messages:messages
            })
            
        } catch (error) {
            console.error(error)
        } finally{
            await this.producer.disconnect();
             //process.exit(0)
        }
    }

    async consume(group,topic_name,callback){
        try {
            this.consumer=this.kafka.consumer({groupId:group});
            await this.consumer.connect()
            await this.consumer.subscribe({
                topic:topic_name,
                fromBeginning:true
            })
            await this.consumer.run({
                eachMessage:async ({topic,partition,message})=>{
                    const value=message.value.toString();
                    callback(value)
                }
            })
        } catch (error) {
            console.error( error)
        }
    }

}


module.exports=kafkaConfig