import { Injectable } from '@nestjs/common';
import { TCertificacionTecnica, TCompetenciaCT, TMaterialDescargableCT } from 'index';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CertificacionTecnicaService {
    constructor(private databaseService: DatabaseService){}

    async get(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCertificacionesTecnicas = await mysqlConnection
                                .execute(`
                                    SELECT 
                                        id,
                                        nombre,
                                        descripcion,
                                        activo
                                    FROM
                                        oferta_edu_certificaciones_tecnicas;

                                `,[]);

        
        mysqlConnection.end();
        sshConnection.end();


        let certificacionesTecnicas = responseCertificacionesTecnicas[0] as Array<TCertificacionTecnica>;


        const materialesDescargables = await this.getMaterialesDescargables();
        const competencias = await this.getCompetencias();

        for (let certificacionTecnica of certificacionesTecnicas ) {

            certificacionTecnica.materiales_descargables = materialesDescargables
                                                            .filter(material => material.id_certificacion_tecnica === certificacionTecnica.id);
        
            certificacionTecnica.competencias = competencias
                                                    .filter(competencia => competencia.id_certificacion_tecnica === certificacionTecnica.id);
        }


        
        return certificacionesTecnicas;

    }

    async getMaterialesDescargables( ){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseMaterialesDescargablesCT = await mysqlConnection
                                                        .execute(`
                                                            SELECT 
                                                                oectdes.id,
                                                                oectdes.id_certificacion_tecnica,
                                                                oectdes.id_tipo,
                                                                oectd.tipo,
                                                                oectdes.ruta
                                                            FROM 
                                                                oferta_edu_certificaciones_tecnicas_descargables oectdes
                                                            INNER JOIN oferta_edu_cat_tipo_descargable oectd ON oectd.id = oectdes.id_tipo	
                                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const materialesDescargablesCT = responseMaterialesDescargablesCT[0] as Array<TMaterialDescargableCT>

        return materialesDescargablesCT;
    }

    async getCompetencias(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCompetenciasCT = await mysqlConnection
                                                        .execute(`
                                                            SELECT 
                                                                id, 
                                                                id_certificacion_tecnica, 
                                                                competencia 
                                                            FROM 
                                                                oferta_edu_certificaciones_tecnicas_competencias;
                                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const competenciasCT = responseCompetenciasCT[0] as Array<TCompetenciaCT>

        return competenciasCT;
    }

}
