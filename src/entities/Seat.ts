import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Bus } from "./Bus";
import { Ticket } from "./Ticket";

@Index("PK__Seat__311713F3691ED943", ["seatId"], { unique: true })
@Entity("Seat", { schema: "dbo" })
export class Seat {
  @Column("int", { primary: true, name: "SeatId" })
  seatId: number;

  @Column("int", { name: "Price", default: () => "(0)" })
  price: number;

  @Column("bit", { name: "Deleted", default: () => "(0)" })
  deleted: boolean;

  @Column("nvarchar", { name: "Name", length: 128 })
  name: string;

  @ManyToOne(() => Bus, (bus) => bus.seats)
  @JoinColumn([{ name: "BusId", referencedColumnName: "busId" }])
  bus: Bus;

  @OneToMany(() => Ticket, (ticket) => ticket.seat)
  tickets: Ticket[];
}
