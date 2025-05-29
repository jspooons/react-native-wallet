import { Model, DataTypes, Optional, Sequelize, UUIDV4 } from 'sequelize';

export interface TransactionsAttributes {
  id: string;
  userId: string;
  title: string;
  amount: number;
  category: string;
}

interface TransactionsCreationAttributes extends Optional<TransactionsAttributes, 'id'> {}

export class Transactions
  extends Model<TransactionsAttributes, TransactionsCreationAttributes>
  implements TransactionsAttributes
{
  public id!: string;
  public userId!: string;
  public title!: string;
  public amount!: number;
  public category!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initTransactionsModel = (sequelize: Sequelize) => {
  Transactions.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      amount: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2), // fixed-point number with: 10 digits total, 2 digits after the decimal point
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      tableName: 'Transactions',
      timestamps: true,
      freezeTableName: true,
      paranoid: false,
    }
  );

  return Transactions;
};
