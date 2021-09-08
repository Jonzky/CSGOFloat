
const optionDefinitions = [
    { name: 'config', alias: 'c', type: String, defaultValue: '../config.js' }, // Config file location
    { name: 'steam_data', alias: 's', type: String } // Steam data directory
];

var logger = require('winston');
Elasticsearch = require('winston-elasticsearch'),
elasticsearch = require('elasticsearch'),
args = require('command-line-args')(optionDefinitions),
CONFIG = require(args.config);
const { ElasticsearchTransport } = require('winston-elasticsearch');


const client = new elasticsearch.Client({ host: CONFIG.es_host })

var esTransportOpts = {
  level: 'info',
  client: client,
  indexPrefix: 'csgofloat'
};

const esTransport = new ElasticsearchTransport(esTransportOpts);
// const logger = winston.createLogger({
    
//   transports: [
//     esTransport
//   ]
// });

logger.add(esTransport);
  
// logger.on('error', (error) => {
//   console.error('Error in logger caught', error);
// });
esTransport.on('error', (error) => {
  console.error('Error in logger caught', error);
});

module.exports=logger;