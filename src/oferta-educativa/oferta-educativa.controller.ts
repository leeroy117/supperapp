import { EstudioOficialService } from './estudio-oficial.service';
import { EducacionEjecutivaService } from './educacion-ejecutiva.service';
import { CertificacionTecnicaService } from './certificacion-tecnica.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/common/public_access';

@Controller('oferta-educativa')
export class OfertaEducativaController {

    constructor(
            private certificacionTecnicaService: CertificacionTecnicaService, 
            private educacionEjecutivaService: EducacionEjecutivaService,
            private estudioOficialService: EstudioOficialService
    ){}

    // @Public()
    @Get('certificaciones-tecnicas')
    getCertificacionesTecnicas(): any{
        const response = this.certificacionTecnicaService.get();

        return response;
    }

    // @Public()
    @Get('educacion-ejecutiva')
    getEducacionEjecutiva(): any{
        // const response = this.educacionEjecutivaService.getEspecialidades();
        const response = this.educacionEjecutivaService.get();

        return response;
    }

    // @Public()
    @Get('estudios-oficiales')
    getEstudiosOficiales(): any{
        // const response = this.educacionEjecutivaService.getEspecialidades();
        const response = this.estudioOficialService.get();
        // const response = this.estudioOficialService.getCarreras();

        return response;
    }

}
