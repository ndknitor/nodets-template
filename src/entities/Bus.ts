import { Column, Entity, Index, OneToMany } from "typeorm";
import { Seat } from "./Seat";

@Index("PK__Bus__6A0F60B56EA5C528", ["busId"], { unique: true })
@Entity("Bus", { schema: "dbo" })
export class Bus {
  @Column("int", { primary: true, name: "BusId" })
  busId: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 128 })
  name: string | null;

  @Column("nvarchar", { name: "LicensePlate", length: 16 })
  licensePlate: string;

  @Column("bit", { name: "Deleted", default: () => "(0)" })
  deleted: boolean;

  @Column("int", { name: "SeatCount", nullable: true })
  seatCount: number | null;

  @OneToMany(() => Seat, (seat) => seat.bus)
  seats: Seat[];
}
