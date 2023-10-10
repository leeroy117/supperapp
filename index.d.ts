import { Connection } from 'mysql2/promise';
import { Client } from 'ssh2';

export type TConnection = {
    mysqlConnection: Connection,
    sshConnection: Client
};

// export type TEstudioOficial = {
//     id: number,
//     nombre: string,
//     descripcion: string,
//     competencias: Array<TCompetencia>,
//     requisitos: Array<TRequisito>,
//     materiales_descargables: Array<TMaterialDescargable>,
//     carreras: Array<any>
// }

// export type TCompetenciaEstudioOficial = {
//     id: number,
//     id_estudio_oficial: number,
//     competencia: string
// }

// export type TRequisitoEstudioOficial = {
//     id: number,
//     id_estudio_oficial_carrera: number,
//     id_requisito: number,
//     requisito: string,
//     activo: number
// }

// export type TCarrerasEstudioOficial = {
//     id: number
//     nombre: string
//     objetivo: string
//     competencias: Array<TCompetencia>
//     requisitos: Array<TRequisito>
//     materiales_descargables: Array<TMaterialDescargable>
// }

// export type TMaterialDescargableEstudioOficial = {
//     id: number,
//     id_estudio_oficial_carrera: number,
//     id_tipo: number,
//     ruta: string
// }

/**
 * *Tipos de certificaciones tecnicas
 */
export type TCertificacionTecnica = {
    id: number,
    nombre: string,
    descripcion: string,
    activo: string,
    competencias: Array<TCompetenciaCertificacionTecnica>,
    materiales_descargables: Array<TMaterialDescargableCertificacionTecnica>
}

export type TCompetenciaCT = {
    id: number,
    id_certificacion_tecnica: number,
    competencia: string
}

export type TMaterialDescargableCT = {
    id: number
    id_certificacion_tecnica: number,
    id_tipo: number,
    tipo: string,
    ruta: string
}
/***************************************************************************/
/**
 * *Tipos de Educacion Ejecutiva
 */
export type TEducacionEjecutiva = {
    id: number,
    nombre: string,
    descripcion: string,
    especialidades: Array<TEspecialidadEE>,
}

export type TEspecialidadEE = {
    id: number,
    id_educacion_ejecutiva: number,
    nombre: string,
    descripcion: string,
    activo: number,
    competencias: Array<TCompetenciaEE>,
    materiales_descargables: Array<any>
}

export type TCompetenciaEE = {
    id: number,
    id_educacion_ejecutiva_curso: number,
    competencia: string
}

export type TMaterialDescargableEE = {
    id: number,
    id_educacion_ejecutiva_curso: number,
    id_tipo: number,
    tipo: string,
    ruta: string
}
/***********************************************/
/**
 * *Tipos de Estudios Oficiales
 */

export type TEstudioOficial = {
    id: number,
    nombre: string,
    descripcion: string,
    competencias: Array<TCompetenciaEO>
    requisitos: Array<any> | null,
    carreras: Array<TCarreraEO>
}

export type TCompetenciaEO = {
    id: number,
    id_estudio_oficial: number,
    competencia: string
}

export type TCarreraEO = {
    id: number,
    id_estudio_oficial: number,
    nombre: string,
    objetivo: string,
    competencias: Array<TCarreraComptenciaEO>,
    requisitos: Array<TCarreraRequisitoEO>,
    materiales_descargables: Array<TCarreraMaterialDescargableEO>,
    especialidades: Array<TCarreraEspecialidadEO>
}

export type TCarreraComptenciaEO = {
    id: number,
    id_estudio_oficial_carrera: number,
    competencia: string
}

export type TCarreraRequisitoEO = {
    id_requisito: number,
    id_estudio_oficial_carrera: number,
    requisito: string,
    activo: number
}

export type TCarreraMaterialDescargableEO = {
    id: number,
    id_estudio_oficial_carrera: number,
    id_tipo: number,
    tipo: string,
    ruta: string
}

export type TCarreraEspecialidadEO = {
    id: number,
    id_estudio_oficial_carrera: number,
    nombre: string,
    objetivo: string,
    competencias: Array<TCarreraEspeciliadCompetenciaEO>,
    requisitos: Array<TCarreraEspecialidadRequisitoEO>,
    materiales_descargables: Array<TCarreraEspecialidadMaterialDescargableEO>
}

export type TCarreraEspeciliadCompetenciaEO = {
    id: number,
    id_carrera_especialidad: number,
    competencia: string
}

export type TCarreraEspecialidadRequisitoEO = {
    id_requisito: number,
    id_carrera_especialidad: number,
    requisito: string,
    activo: number
}

export type TCarreraEspecialidadMaterialDescargableEO = {
    id: number,
    id_carrera_especialidad: number,
    id_tipo: number,
    tipo: string,
    ruta: string
}




// export type TRequisitoEO = {

// }





