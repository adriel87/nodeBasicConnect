# Node - conectar con MySQL

## En primper lugar

creamos nuestra configuramos nuestro entorno de trabajo

1. Tener Node instalado
2. Crear una carpeta donde podamos trabajar
3. Dentro de la carpeta ejecutamos el comando
```CLI
npm init -y
```
4. Tener una base de datos preparada en este tutorial usaremos MySQL
5. Instalamos el paquete de node para que nos facilite el trabajo de conectar con la abase de datos

```
npm i mysql
```
6. creamos un archivo que podemos llamar connect.js para configurar la conexion y escribimos el siguiente codigo
```javascript
const mysql = require('mysql');
const connection= mysql.createConnection({
    host : 'nuestraCadenaDeCoexion',
    database : 'laTabla a la que queremos acceder',
    user : 'user',
    password : 'pass',
});
```
7. Vale ahora toca ejecutar el metodo dentro de la variable connection para para que se establezca una coexion
```javascript
connection.connect( err =>{
    if(err){
        console.error('Tenemos un problema', err.stack);
        return // en caso de fallo salimos
    }
    console.log('Conexion OK!!!')
})
```

8. ya solo queda realizar una consulta contra la base de datos
```javascript
connection.query('SELECT * FROM usuarios', (error,result,fields)=>{

    if (error) {
        console.log('tuvimos un fallo en la consulta ', error.message);
    }

    console.log(result); // aqui tenemos la informacion de la consulta

})
```

9. por ultimo si queremos indicar el maximo de conexiones disponibles tendremos que modificar un poco nuestra conexion

```javascript
const mysql = require('mysql');
const pool= mysql.createPool({
    connectionLimit : 10,
    host : 'nuestraCadenaDeCoexion',
    database : 'laTabla a la que queremos acceder',
    user : 'user',
    password : 'pass',
});
//una vez configurada

pool.getConnection(function(err, connection) {
  if (err) throw err; // establecemos que hacer en caso de fallo

  //usamos la conexion
  connection.query('SELECT something FROM sometable', function (error, results, fields) {
    // tratamos con los datos

    connection.release();//devolvemos la conexion al pool

    // manejamos los errores
    if (error) throw error;

    // una vez devuelta la conexion no podemos usarla
  });
});
```
trabajar con el pool de conexion es basicamente igual que trabajar con la conexion anterior. El pool de conexion tiene diversos metodos interesantes como podria ser
```javascript
    pool.on('connection', (connection)=>{}) //evento cuando se da una conexion
    pool.on('enqueue', ()=>{}); //cuando tenemos una peticion de conexion y se queda en la cola 
    pool.on('release', (connection)=>{}) //cuando una coexion es devuelta al pool

```

### Y ahora que?
ahora deberiamos familirizarnos con un [ORM](https://codigofacilito.com/articulos/orm-explicacion) para poder abstraer las consultas de la conexion y trabajar indistintamente usemos la conexion que usemos

Asi que para el siguiente tutorial vamos a ver [Sequelize](https://sequelize.org/master/) un ORM que podremos usar con las siguientes bases de datos Postgres, MySQL, MariaDB, SQLite y Microsoft SQL Server

# A seguir trabajando