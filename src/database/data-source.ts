import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { ApiKey } from 'src/entity/apikey.entity';
import { Injectable } from '@nestjs/common';
import ssh2, { Client, ClientChannel, ConnectConfig } from 'ssh2';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

@Injectable()
export class DatabaseSource{

    constructor(){}

    sshConfig = {
        username: process.env.SSH_USERNAME,
        password: process.env.SSH_PASSWORD,
        host: process.env.SSH_HOST,
        port: parseInt(process.env.SSH_PORT) 
    };
    
    createDatabaseConnection() {

        let clientChannel: ClientChannel; 

        let mysqlConfig: mysql.ConnectionOptions = {
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            port: parseInt(process.env.MYSQL_PORT),
            // user: 'root',
            // password: 'UEJdjck5786Ji.',
            // database: 'escolar',
            // port: 9876,
            stream: typeof clientChannel,
            // multipleStatements: true
        };

        const sshConnection = new Client();
    
        
        const sshClient = sshConnection.connect(this.sshConfig);

        sshConnection.on('ready', () => {
            sshConnection.forwardOut('127.0.0.1', 8000,'127.0.0.1', 9876,(err, channel) => {
                console.log("🚀 ~ file: data-source.ts:63 ~ DatabaseSource ~ sshConnection.forwardOut ~ channel:", channel)
            	let mysqlConfig: DataSourceOptions = {
                    type: 'mysql',
                    // host: 'localhost',  // Puedes usar 'localhost' porque estás conectándote a través de SSH      
                    port: parseInt(process.env.MYSQL_PORT), // Puerto MySQL en el servidor remoto
                    username: process.env.MYSQL_USER,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE,
                    synchronize: false,
                    entities: [ApiKey],
                    connectorPackage: 'mysql2'
                };

                // mysql.createConnection()

                const AppDataSource  = new DataSource(mysqlConfig);

                AppDataSource
                    .initialize()
                    .then((data) => {
                        console.log("🚀 ~ file: data-source.ts:81 ~ DatabaseSource ~ .then ~ data:", data);
                    })
                    .catch((err)=>console.log('err', err))
            })
            
        });
        // console.log("🚀 ~ file: data-source.ts:55 ~ DatabaseSource ~ createDatabaseConnection ~ sshClient:", sshClient)
    }



}
