import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Consulta from '../consulta';

import { Generos, TiposSanguineos } from './enums';

@Entity('pacientes')
export default class Paciente {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    nome: string;

  @Column()
    email: string;

  @Column()
    telefone: string;

  @Column({
    type: 'varchar',
    enum: Generos,
    default: Generos.OUTRO
  })
    genero: Generos;

  @CreateDateColumn()
    dataNascimento: Date;

  @Column()
    peso: number;

  @Column()
    altura: number;

  @Column({
    type: 'varchar',
    enum: TiposSanguineos,
    default: TiposSanguineos.NAO_INFORMADO
  })
    tipoSanguineo: TiposSanguineos;

  @CreateDateColumn()
    dataCriacao: Date;

  @CreateDateColumn()
    dataAtualizacao: Date;

  @OneToMany(() => Consulta, consulta => consulta.paciente)
  @JoinColumn({ name: 'id', referencedColumnName: 'paciente' })
    consultas?: Array<Consulta>;
}
