const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '33060',
    database: 'biblioteca',
    user:'root',
    password:'root'

})


connection.connect(err =>{
    if (err) {
        console.error('tuvimos un fallo\n', err.message);
        return
    }
    console.log('conxion OK!!!');
})

connection.query('SELECT usuario, clave as pass FROM usuarios', (error,result,fields)=>{

    if (error) {
        console.log('tuvimos un fallo en la consulta ', error.message);
    }

    //el objeto result nos devuelve la informacion solicitada 
    //podemos acceder a el de varias formas
    //consultando en bruto el objeto 
    //haciendo referencia a una posicion en concreto
    console.log(result[0].usuario);

    console.log(result[1].pass);//aqui vemos que utilizamos el alias usado en la consulta
    
    console.log(result.length);//tambien podemos acceder a la propiedad length 
    

    //tenemos los datos, y ahora podemos hacer lo que queramos con ellos

})

connection.end();//finalizamos la conexion

