import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import Consulta from '../Consulta';

@Entity('observacoes')
export default class Observacao {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Consulta, consulta => consulta.observacoes)
  @JoinColumn({ name: 'consulta', referencedColumnName: 'id' })
    consulta: Consulta;

  @Column()
    mensagem: string;

  @CreateDateColumn()
    data: Date;
}
