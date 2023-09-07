const kafkaConfig = require("./kafkaConfig");

const kafka= new kafkaConfig();

kafka.createTopics("Logs7",1)