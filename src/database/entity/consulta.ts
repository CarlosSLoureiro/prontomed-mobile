import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Paciente from './paciente';

@Entity('consultas')
export default class Consulta {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Paciente, paciente => paciente.consultas)
    paciente: Paciente;
}
