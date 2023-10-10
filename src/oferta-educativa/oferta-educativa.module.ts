import { Module } from '@nestjs/common';
import { OfertaEducativaController } from './oferta-educativa.controller';
import { CertificacionTecnicaService } from './certificacion-tecnica.service';
import { DatabaseModule } from 'src/database/database.module';
import { EducacionEjecutivaService } from './educacion-ejecutiva.service';
import { EstudioOficialService } from './estudio-oficial.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OfertaEducativaController],
  providers: [CertificacionTecnicaService, EducacionEjecutivaService, EstudioOficialService],
})
export class OfertaEducativaModule {}
