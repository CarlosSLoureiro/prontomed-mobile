import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Paciente from '../paciente';

@Entity('consultas')
export default class Consulta {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Paciente, paciente => paciente.consultas)
  @JoinColumn({ name: 'paciente', referencedColumnName: 'id' })
    paciente: Paciente;
}
