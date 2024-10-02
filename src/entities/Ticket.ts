import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Trip } from "./Trip";
import { Seat } from "./Seat";
import { User } from "./User";

@Index("PK__Ticket__712CC607FC90E74B", ["ticketId"], { unique: true })
@Entity("Ticket", { schema: "dbo" })
export class Ticket {
  @Column("int", { primary: true, name: "TicketId" })
  ticketId: number;

  @Column("int", { name: "Status", default: () => "(0)" })
  status: number;

  @Column("int", { name: "Price", default: () => "(0)" })
  price: number;

  @Column("datetime", { name: "BookedDate" })
  bookedDate: Date;

  @Column("nvarchar", { name: "From", nullable: true, length: 128 })
  from: string | null;

  @Column("nvarchar", { name: "To", nullable: true, length: 128 })
  to: string | null;

  @ManyToOne(() => Trip, (trip) => trip.tickets)
  @JoinColumn([{ name: "TripId", referencedColumnName: "tripId" }])
  trip: Trip;

  @ManyToOne(() => Seat, (seat) => seat.tickets)
  @JoinColumn([{ name: "SeatId", referencedColumnName: "seatId" }])
  seat: Seat;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: User;
}
