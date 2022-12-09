import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Paciente from '../Paciente';

@Entity('consultas')
export default class Consulta {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Paciente, paciente => paciente.consultas)
  @JoinColumn({ name: 'paciente', referencedColumnName: 'id' })
    paciente!: Paciente;

  @CreateDateColumn()
    dataAgendada: Date;

  @Column()
    evento!: string;

  @CreateDateColumn()
    dataCriacao: Date;

  @CreateDateColumn()
    dataAtualizacao: Date;
}
