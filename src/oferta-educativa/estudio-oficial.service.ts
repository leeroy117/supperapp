import { Injectable } from '@nestjs/common';
import { TCarreraComptenciaEO, TCarreraEO, TCarreraEspecialidadEO, TCarreraEspecialidadMaterialDescargableEO, TCarreraEspecialidadRequisitoEO, TCarreraEspeciliadCompetenciaEO, TCarreraMaterialDescargableEO, TCarreraRequisitoEO, TCompetenciaEO, TEstudioOficial } from 'index';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EstudioOficialService {
    constructor(private databaseService: DatabaseService){}

    async get(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEstudiosOficiales= await mysqlConnection
                                        .execute(`
                                            SELECT
                                                id,
                                                nombre,
                                                descripcion 
                                            FROM
                                                oferta_edu_estudios_oficiales;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const estudiosOficiales = responseEstudiosOficiales[0] as Array<TEstudioOficial>;
        const competencias = await this.getEstudiosOficialesCompetencias();
        const carreras = await this.getCarreras();

        for (const estudioOficial of estudiosOficiales) {
            estudioOficial.competencias = competencias.filter(c => c.id_estudio_oficial === estudioOficial.id);
            estudioOficial.carreras = carreras.filter(c => c.id_estudio_oficial === estudioOficial.id)
        }

        return estudiosOficiales;
    }

    async getEstudiosOficialesCompetencias(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEstudiosOficialesCompetencias= await mysqlConnection
                                        .execute(`
                                            SELECT
                                                id,
                                                id_estudio_oficial,
                                                competencia
                                            FROM
                                                oferta_edu_estudios_oficiales_competencias;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const estudiosOficialesCompetencias = responseEstudiosOficialesCompetencias[0] as Array<TCompetenciaEO>;

        return estudiosOficialesCompetencias;
    }

    async getCarreras(){

        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCarreras= await mysqlConnection
                                        .execute(`
                                            SELECT
                                                id,
                                                id_estudio_oficial,
                                                nombre,
                                                objetivo,
                                                activo
                                            FROM
                                                oferta_edu_estudios_oficiales_carreras;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const carreras = responseCarreras[0] as Array<TCarreraEO>;
        const carrerasCompetencias = await this.getCarrerasCompetencias();
        const carrerasRequisitos = await this.getCarrerasRequisitos();
        const carrerasMaterialesDescargables = await this.getCarrerasMaterialesDescargables();
        const especialidades = await this.getEspecialidades();
        console.log("🚀 ~ file: estudio-oficial.service.ts:36 ~ EstudioOficialService ~ getCarreras ~ especialidades:", especialidades)

        for (const carrera of carreras) {
            carrera.competencias = carrerasCompetencias.filter(cc => cc.id_estudio_oficial_carrera === carrera.id);
            carrera.requisitos = carrerasRequisitos.filter(cr => cr.id_estudio_oficial_carrera === carrera.id);
            carrera.materiales_descargables = carrerasMaterialesDescargables.filter(cmd => cmd.id_estudio_oficial_carrera === carrera.id);
            carrera.especialidades = especialidades.filter(e => e.id_estudio_oficial_carrera === carrera.id)
        }

        return carreras;
    }

    async getCarrerasCompetencias(){

        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCarrerasCompetencias= await mysqlConnection
                                        .execute(`
                                            SELECT
                                                id,
                                                id_estudio_oficial_carrera,
                                                competencia
                                            FROM
                                                oferta_edu_estudios_oficiales_carreras_competencias;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const carrerasCompetencias = responseCarrerasCompetencias[0] as Array<TCarreraComptenciaEO>;

        return carrerasCompetencias;
    }

    async getCarrerasRequisitos(){

        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCarrerasRequisitos= await mysqlConnection
                                        .execute(`
                                            SELECT 
                                                oeeocr.id_requisito,
                                                oeeocr.id_estudio_oficial_carrera,
                                                oecr.requisito,
                                                oecr.activo
                                            FROM 
                                                oferta_edu_estudios_oficiales_carreras_requisitos oeeocr
                                            INNER JOIN oferta_edu_cat_requisitos oecr ON oecr.id = oeeocr.id_requisito
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const carrerasRequisitos= responseCarrerasRequisitos[0] as Array<TCarreraRequisitoEO>;

        return carrerasRequisitos;
    }

    async getCarrerasMaterialesDescargables(){

        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseCarrerasMaterialesDescargables= await mysqlConnection
                                        .execute(`
                                            SELECT 
                                                oeeocr.id_requisito,
                                                oeeocr.id_estudio_oficial_carrera,
                                                oecr.requisito,
                                                oecr.activo
                                            FROM 
                                                oferta_edu_estudios_oficiales_carreras_requisitos oeeocr
                                            INNER JOIN oferta_edu_cat_requisitos oecr ON oecr.id = oeeocr.id_requisito;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const carrerasMaterialesDescargables= responseCarrerasMaterialesDescargables[0] as Array<TCarreraMaterialDescargableEO>;

        return carrerasMaterialesDescargables;
    }
    /**
     * 
     */
    async getEspecialidades(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEspecialidades= await mysqlConnection
                                        .execute(`
                                            SELECT 
                                                id,
                                                id_estudio_oficial_carrera,
                                                nombre,
                                                objetivo,
                                                activo
                                            FROM 
                                                oferta_edu_estudios_oficiales_carreras_especialidades;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const especialidades= responseEspecialidades[0] as Array<TCarreraEspecialidadEO>;
        const competencias = await this.getEspecialidadesCompetencias();
        const requisitos = await this.getEspecialidadesRequisitos();
        const materialesDescargables = await this.getEspecialidadesMaterialesDescargables();

        for (const especialidad of especialidades) {
            especialidad.competencias = competencias.filter(c => c.id_carrera_especialidad === especialidad.id);
            especialidad.requisitos = requisitos.filter(r => r.id_carrera_especialidad === especialidad.id);
            especialidad.materiales_descargables = materialesDescargables.filter(md => md.id_carrera_especialidad === especialidad.id)
        }

        return especialidades;
    }

    async getEspecialidadesCompetencias(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEspecialidadesCompetencias= await mysqlConnection
                                        .execute(`
                                            SELECT
                                                id,
                                                id_carrera_especialidad,
                                                competencia 
                                            FROM
                                                oferta_edu_estudios_oficiales_carreras_especialidades_comp;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const especialidadesCompetencias= responseEspecialidadesCompetencias[0] as Array<TCarreraEspeciliadCompetenciaEO>;

        return especialidadesCompetencias;
    }

    async getEspecialidadesRequisitos(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEspecialidadesRequisitos= await mysqlConnection
                                        .execute(`
                                            SELECT
                                                oeefcer.id_requisito,
                                                oeefcer.id_carrera_especialidad,
                                                oecr.requisito,
                                                oecr.activo
                                            FROM
                                                oferta_edu_estudios_oficiales_carreras_especialidades_requisitos oeefcer
                                            INNER JOIN oferta_edu_cat_requisitos oecr ON oecr.id = oeefcer.id_requisito
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const especialidadesRequisitos= responseEspecialidadesRequisitos[0] as Array<TCarreraEspecialidadRequisitoEO>;

        return especialidadesRequisitos;
    }

    async getEspecialidadesMaterialesDescargables(){
        const responseConnection = await this.databaseService.getConnection();

        const mysqlConnection = responseConnection.mysqlConnection;
        const sshConnection = responseConnection.sshConnection;

        const responseEspecialidadesMaterialesDescargables= await mysqlConnection
                                        .execute(`
                                            SELECT 
                                                oeeoced.id,
                                                oeeoced.id_carrera_especialidad,
                                                oeeoced.id_tipo,
                                                oectd.tipo,
                                                oeeoced.ruta
                                            FROM 
                                                oferta_edu_estudios_oficiales_carreras_especialidades_descarg oeeoced
                                            INNER JOIN oferta_edu_cat_tipo_descargable oectd ON oectd.id = oeeoced.id_tipo;
                                        `,[]);

        mysqlConnection.end();
        sshConnection.end();

        const especialidadesMaterialesDescargables= responseEspecialidadesMaterialesDescargables[0] as Array<TCarreraEspecialidadMaterialDescargableEO>;

        return especialidadesMaterialesDescargables;
    }
}
