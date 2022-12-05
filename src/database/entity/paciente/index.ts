import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import Consulta from '../consulta';

import { Generos, TiposSanguineos } from './enums';

@Entity('pacientes')
export default class Paciente {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    nome: string;

  @OneToMany(() => Consulta, consulta => consulta.paciente)
  @JoinColumn({ name: 'id', referencedColumnName: 'paciente' })
    consultas?: Array<Consulta>;

  @Column({
    type: 'varchar',
    enum: Generos,
    default: Generos.OUTRO
  })
    genero: Generos;

  @Column({
    type: 'varchar',
    enum: TiposSanguineos,
    default: TiposSanguineos.NAO_INFORMADO
  })
    tipoSanguineo: TiposSanguineos;
}
