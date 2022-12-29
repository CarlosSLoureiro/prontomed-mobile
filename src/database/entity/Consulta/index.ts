import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Observacao from '@entity/Observacao';

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
    evento!: string | null;

  @Column()
    finalizada: boolean;

  @CreateDateColumn()
    dataCriacao: Date;

  @CreateDateColumn()
    dataAtualizacao: Date;

  @OneToMany(() => Observacao, observacao => observacao.consulta)
  @JoinColumn({ name: 'id', referencedColumnName: 'consulta' })
    observacoes?: Array<Observacao>;
}
