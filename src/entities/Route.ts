import { Column, Entity, Index, OneToMany } from "typeorm";
import { Trip } from "./Trip";

@Index("PK__Route__80979B4D91764552", ["routeId"], { unique: true })
@Entity("Route", { schema: "dbo" })
export class Route {
  @Column("int", { primary: true, name: "RouteId" })
  routeId: number;

  @Column("nvarchar", { name: "From", length: 128, default: () => "''" })
  from: string;

  @Column("nvarchar", { name: "To", length: 128, default: () => "''" })
  to: string;

  @Column("int", { name: "BasePrice" })
  basePrice: number;

  @Column("bit", { name: "Deleted" })
  deleted: boolean;

  @OneToMany(() => Trip, (trip) => trip.route)
  trips: Trip[];
}
