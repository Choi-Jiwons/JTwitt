module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image',{
        src: {
            type: DataTypes.STRING(200), // STRING, TEXt, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false,
        },
        
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    }

    return Image;
}