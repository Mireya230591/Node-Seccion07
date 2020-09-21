// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

//Entorno

process.env.NODE_ENV = process.env.NODE_ENV|| 'dev';

//Base de DAtos
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
} else{
    urlDB = 'mongodb+srv://devf:devf@devf.t3rsz.mongodb.net/cafe'
}
 process.env.urlDB = urlDB;