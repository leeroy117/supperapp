import { Injectable } from '@nestjs/common';
import { TConnection } from 'index';
import mysql2, { ConnectionOptions, createConnection } from 'mysql2/promise';
import ssh2, { Client, ClientChannel, ConnectConfig } from 'ssh2';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class DatabaseService {

    getConnection() : Promise<TConnection> {

        let clientChannel: ClientChannel; 
    
        let mysqlConfig: ConnectionOptions = {
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
    
        let sshTunnelConfig: ConnectConfig = {
            username: process.env.SSH_USERNAME,
            password: process.env.SSH_PASSWORD,
            host: process.env.SSH_HOST,
            port: parseInt(process.env.SSH_PORT) 
            // username: 'agcolleges',
            // password: 'AG*-daBhf*98G389+2heTrd*q*KJ+DL.JK+JGA*-Dl-k8asd*gp7',
            // host: '164.90.144.135',
            // port: 22
        };
    
        return new Promise( (resolve, reject) => {
            const ssh = new Client();
            try {
            ssh.on('ready',function () {
                ssh.forwardOut(
                    '127.0.0.1',
                    8000,
                    '127.0.0.1',
                // 9876,
                    9876,
                async function (err, stream){
                    
                    if (err){reject(err)} ;
                    
                    try {
                        mysqlConfig.stream = stream;
                        
                        const connection = await createConnection(mysqlConfig);
                        const objConnection : TConnection = {
                            mysqlConnection: connection,
                            sshConnection: ssh
                        }
                        resolve(objConnection);
                        
                    } catch (error) {
                        reject(error);
                    }
        
                }
                )
            })
                .connect(sshTunnelConfig);
            } catch (error) {
                reject(error)
            }
    
        });
    }

    getSSH(){
        return new Promise( (resolve, reject) => {
            let sshTunnelConfig: ConnectConfig = {
                username: process.env.SSH_USERNAME,
                password: process.env.SSH_PASSWORD,
                host: process.env.SSH_HOST,
                port: parseInt(process.env.SSH_PORT) 
            };

            const ssh = new Client();
            try {
            ssh.on('ready',function () {
                ssh.forwardOut(
                    '127.0.0.1',
                    8000,
                    '127.0.0.1',
                // 9876,
                    9876,
                async function (err, stream){
                    
                    if (err){reject(err)} ;
                    
                    try {
                        resolve(stream);
                    } catch (error) {
                        reject(error);
                    }
        
                }
                )
            })
                .connect(sshTunnelConfig);
            } catch (error) {
                reject(error)
            }
    
        });
    }
}
