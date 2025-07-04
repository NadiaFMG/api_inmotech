const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Users, {
        foreignKey: 'Role_FK',
        as: 'users'
      });
    }
  }

  Role.init({
    Role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Role_description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    Role_status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    Role_priority: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'role',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  return Role;
};