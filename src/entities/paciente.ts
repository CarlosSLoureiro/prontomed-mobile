import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Consulta } from './consulta';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    nome: string;

  @OneToMany(() => Consulta, consulta => consulta.paciente)
    consultas: Array<Consulta>;
}
