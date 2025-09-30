import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";

@Table
export class Student extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING, // stored as text
    allowNull: false,
  })
  dateOfBirth!: string;

  @Column({
    type: DataType.ENUM("Male", "Female", "Other"),
    allowNull: false,
  })
  gender!: "Male" | "Female" | "Other";

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  studentId!: string;
}
