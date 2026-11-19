PRUEBAS DE API - SIGNUP Y LOGIN DE DEMOBLAZE (KARATE)
=====================================================

Opcion elegida: Opcion 1
    Signup: https://api.demoblaze.com/signup
    Login:  https://api.demoblaze.com/login
Herramienta: Karate 1.5.2 + JUnit 5 + Maven (con Maven Wrapper).


1. PRERREQUISITOS
-----------------
- Java 17 o superior (probado con OpenJDK 25). Tiene que ser un JDK.
      java -version
- Maven NO hace falta: el proyecto trae el wrapper (mvnw), que lo descarga solo
  la primera vez.
- Conexion a internet (las pruebas van contra la api publica).


2. EJECUCION
------------
Desde la raiz del repo:

    cd api-karate

a) Toda la suite:

    Linux / Mac:   ./mvnw test
    Windows:       mvnw.cmd test

b) Solo signup o solo login (por tags):

    ./mvnw test "-Dkarate.options=--tags @signup"
    ./mvnw test "-Dkarate.options=--tags @login"

c) Solo los casos principales (smoke):

    ./mvnw test "-Dkarate.options=--tags @smoke"

d) Bugs conocidos de la api (se espera que fallen, ver conclusiones.txt):

    ./mvnw test "-Dkarate.options=--tags @known-bug"

La primera ejecucion tarda mas porque descarga Maven y las dependencias.


3. REPORTES
-----------
- Reporte HTML de Karate:  target/karate-reports/karate-summary.html
  Ahi se ve cada escenario con su request y response completos (entradas y
  salidas de cada caso).
- Log de la ejecucion:     target/karate.log
- En la carpeta reports/ esta el reporte de la ultima corrida que hice, como
  evidencia. Abrir reports/karate-summary.html en el navegador.
- En reports/known-bugs/ esta el reporte de la corrida de los @known-bug,
  con los 8 escenarios en rojo y el response real de la api en cada uno.


4. CASOS DE PRUEBA
------------------
Los 4 casos que pide el ejercicio:

  signup.feature
    - Crear un nuevo usuario                      -> 200, body ""
    - Intentar crear un usuario ya existente      -> 200, errorMessage "This user already exist."

  login.feature
    - Login con usuario y password correctos      -> 200, "Auth_token: <token>"
    - Login con password incorrecto               -> 200, errorMessage "Wrong password."

Casos extra de apoyo:
    - Login con un usuario que no existe          -> errorMessage "User does not exist."
    - Signup sin username / sin password / vacio  -> errorMessage "Bad parameter, missing username or password"
    - Login sin username / sin password           -> errorMessage "Bad parameter, missing username"
    - Signup duplicado con otro password          -> lo rechaza y el password original sigue sirviendo
    - Auth_token decodificado (@security)         -> es el username seguido de un numero

Total corrida por defecto: 12 escenarios, todos pasan.

Bugs conocidos (@known-bug, fuera de la corrida por defecto, hoy fallan):
    - Signup con username vacio / null / objeto   -> la api responde 500
    - Login con username vacio / null             -> la api responde 500
    - Signup con password vacio / null / numero   -> la api registra al usuario igual
Estos 8 escenarios afirman el comportamiento esperado (error controlado), no
el actual. El dia que el bug se corrija van a pasar.

Entradas: en ambos servicios es un POST con body json
    { "username": "<usuario>", "password": "<password en base64>" }


5. ESTRUCTURA
-------------
api-karate/
  pom.xml
  mvnw, mvnw.cmd, .mvn/          maven wrapper
  src/test/java/
    karate-config.js             url base por ambiente, timeouts, headers
    logback-test.xml             configuracion de logs
    demoblaze/
      DemoblazeApiTest.java      runner (corre los features en paralelo)
      helpers/
        data-generator.js        genera un usuario unico por ejecucion
        create-user.feature      registra un usuario, reutilizable desde otros features
      signup/signup.feature
      login/login.feature
  reports/                       reporte de evidencia
  readme.txt
  conclusiones.txt


6. NOTAS
--------
- Cada ejecucion crea usuarios nuevos (qa_<timestamp>_<random>) porque la api
  no tiene un servicio para borrarlos. Asi las pruebas se pueden repetir las
  veces que haga falta sin chocar con datos de corridas anteriores.
- El password se manda en base64 porque asi lo envia el front de demoblaze.
