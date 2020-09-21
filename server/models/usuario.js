const mongoose = require('mongoose');

//Pligin para manejar la validacion de unique
const uniqueValidator = require('mongoose-unique-validator');

//CRear un objeto en donde tenga los valores que se aceptan
//y el mensaje el VALUE es lo que el usuario ingresa en el rol
let rolesValidos={
    values:['ADMIN_ROLE','SUPER_ROLE'],
    message : '{VALUE}No es un Valor inbalido'
};
let Schema = mongoose.Schema;

let usuarioSchema= new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es necesario']
    },
    email:{ type:String,
        //unique es para que no se repita el contenido
            unique:true,
            required:[ true, 'El nombre es nesasario']},
    password:{ type:String,
                required:[ true,'la contraaseña es nesasario']},
    img:{type:String,
        required:[ false]
    },
    role:{ type:String,
        default:'USER_ROLE',
        enum:rolesValidos},
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,

        default: false
    }
});

//Metodo para eliminar el password en el json

//Modificar el metodo toJSON el cual se utiliza para mostrar el
//usuario
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;
    return userObject;
}
usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe d ser unico'})
module.exports =mongoose.model('Usuario', usuarioSchema);