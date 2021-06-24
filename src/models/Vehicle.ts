import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("vehicles")
class Vehicle {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  placa: string;

  @Column()
  chassi: string;

  @Column()
  renavam: string;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column()
  ano: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Vehicle };
