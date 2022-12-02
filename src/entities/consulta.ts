
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Paciente } from './paciente';

@Entity('consulta')
export class Consulta {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Paciente, paciente => paciente.consultas)
    paciente: Paciente;
}
