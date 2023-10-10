import { Injectable } from '@nestjs/common';
import { TCompetenciaEE, TEducacionEjecutiva, TEspecialidadEE, TMaterialDescargableEE } from 'index';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EducacionEjecutivaService {
    constructor(private databaseService: DatabaseService){}
    
    async get(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEducacionEjecutiva = await mysqlConnection
                                .execute(`
                                    SELECT
                                        id,
                                        nombre,
                                        descripcion,
                                        activo 
                                    FROM
                                        oferta_edu_educacion_ejecutiva;

                                `,[]);

        
        mysqlConnection.end();
        sshConnection.end();

        const educacionEjecutiva = responseEducacionEjecutiva[0] as Array<TEducacionEjecutiva>;
        const especialidades = await this.getEspecialidades();

        for (const nivel of educacionEjecutiva) {
            nivel.especialidades = especialidades.filter(especialidad => especialidad.id_educacion_ejecutiva === nivel.id); 
        }


        return educacionEjecutiva;

    }

    async getEspecialidades(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEspecialidades = await mysqlConnection
                                .execute(`
                                    SELECT 
                                        id,
                                        id_educacion_ejecutiva,
                                        nombre,
                                        descripcion, 
                                        activo
                                    FROM 
                                        oferta_edu_educacion_ejecutiva_cursos;
                                `,[]);

        
        mysqlConnection.end();
        sshConnection.end();

        const especialidades = responseEspecialidades[0] as Array<TEspecialidadEE>;
        const competencias  = await this.getCompetenciasEspecialidades();
        const materialesDescargables = await this.getMaterialesDescargablesEspecialidades();

        for (const especialidad of especialidades) {
            especialidad.competencias = competencias
                                            .filter(competencia => competencia.id_educacion_ejecutiva_curso === especialidad.id)
            especialidad.materiales_descargables = materialesDescargables
                                                    .filter(material => material.id_educacion_ejecutiva_curso === especialidad.id)
        }

        return especialidades;
    }
    
    async getCompetenciasEspecialidades(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCompetencias = await mysqlConnection
                                .execute(`
                                    SELECT 
                                        id,
                                        id_educacion_ejecutiva_curso,
                                        competencia
                                    FROM
                                        oferta_edu_educacion_ejecutiva_cursos_competencias;
                                `,[]);

        
        mysqlConnection.end();
        sshConnection.end();

        const competencias = responseCompetencias[0] as Array<TCompetenciaEE>;
        return competencias;
    }

    async getMaterialesDescargablesEspecialidades(){

        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;
        
        const responseMaterialDescargable = await mysqlConnection
                                .execute(`
                                    SELECT
                                        oeeecd.id,
                                        oeeecd.id_educacion_ejecutiva_curso,
                                        oeeecd.id_tipo,
                                        oectd.tipo,
                                        oeeecd.ruta
                                    FROM
                                        oferta_edu_educacion_ejecutiva_cursos_descargables oeeecd
                                    INNER JOIN oferta_edu_cat_tipo_descargable oectd ON oectd.id = oeeecd.id_tipo
                                `,[]);

        
        mysqlConnection.end();
        sshConnection.end();
        const materialesDescargables = responseMaterialDescargable[0] as Array<TMaterialDescargableEE>;
        return materialesDescargables; 

    }

}
