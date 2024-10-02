import { Column, Entity, Index, OneToMany } from "typeorm";
import { Ticket } from "./Ticket";

@Index("PK__User__1788CC4C114E345D", ["userId"], { unique: true })
@Entity("User", { schema: "dbo" })
export class User {
  @Column("int", { primary: true, name: "UserId" })
  userId: number;

  @Column("nvarchar", { name: "Email", length: 128 })
  email: string;

  @Column("nvarchar", { name: "Fullname", length: 128, default: () => "''" })
  fullname: string;

  @Column("nvarchar", { name: "Phone", length: 16, default: () => "''" })
  phone: string;

  @Column("nvarchar", { name: "Address", length: 128, default: () => "''" })
  address: string;

  @Column("int", { name: "RoleId", default: () => "(0)" })
  roleId: number;

  @Column("nvarchar", { name: "Password", length: 128, default: () => "''" })
  password: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
