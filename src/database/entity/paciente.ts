import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Consulta from './consulta';

@Entity('pacientes')
export default class Paciente {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    nome: string;

  @OneToMany(() => Consulta, consulta => consulta.paciente)
  @JoinColumn({ name: 'id', referencedColumnName: 'paciente' })
    consultas?: Array<Consulta>;
}
