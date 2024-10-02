import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Ticket } from "./Ticket";
import { Route } from "./Route";

@Index("PK__Trip__51DC713E57875203", ["tripId"], { unique: true })
@Entity("Trip", { schema: "dbo" })
export class Trip {
  @Column("int", { primary: true, name: "TripId" })
  tripId: number;

  @Column("datetime", { name: "StartDate" })
  startDate: Date;

  @Column("datetime", { name: "EndDate" })
  endDate: Date;

  @Column("int", { name: "BusId" })
  busId: number;

  @OneToMany(() => Ticket, (ticket) => ticket.trip)
  tickets: Ticket[];

  @ManyToOne(() => Route, (route) => route.trips)
  @JoinColumn([{ name: "RouteId", referencedColumnName: "routeId" }])
  route: Route;
}
