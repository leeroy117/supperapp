import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Client } from 'ssh2';

@Injectable()
export class ApikeyService {
    constructor(private databaseService: DatabaseService){}

    async get(apiKey: string){
        const responseDatabase = await this.databaseService.getConnection();

        const mysqlConnection = responseDatabase.mysqlConnection;
        const sshConnection : Client = responseDatabase.sshConnection;

        // const key = '5ea7497e-5e4d-11ee-8c99-0242ac120002';

        const response = await mysqlConnection.execute(`
            SELECT * FROM tb_apikeys_superapp WHERE apikey = ? and estatus = 1; `,
            [apiKey]
        );

        // const result
        console.log('response', response);
        
        const apikeyResponse =  response[0][0]?.apikey;
        
        mysqlConnection.end();
        sshConnection.end();

        if (typeof apikeyResponse == 'undefined') {
            return false;
        }

        return true;


        
    }
}
