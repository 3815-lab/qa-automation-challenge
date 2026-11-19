@signup
Feature: Signup - registro de usuarios en demoblaze

  Background:
    * url baseUrl
    * def newUser = call read('classpath:demoblaze/helpers/data-generator.js') defaultPassword

  @smoke
  Scenario: Crear un nuevo usuario
    Given path 'signup'
    And request { username: '#(newUser.username)', password: '#(newUser.password)' }
    When method post
    Then status 200
    # cuando el registro sale bien la api responde un string json vacio (""), sin id ni mensaje.
    # karate lo recibe como texto plano, por eso se parsea antes de comparar
    And match JSON.parse(response) == ''

  Scenario: Intentar crear un usuario ya existente
    * def created = call read('classpath:demoblaze/helpers/create-user.feature')
    Given path 'signup'
    And request { username: '#(created.user.username)', password: '#(created.user.password)' }
    When method post
    Then status 200
    And match response == { errorMessage: 'This user already exist.' }

  Scenario: Un signup duplicado con otro password no pisa la credencial original
    * def created = call read('classpath:demoblaze/helpers/create-user.feature')
    * def user = created.user

    Given path 'signup'
    And request { username: '#(user.username)', password: '#(user.wrongPassword)' }
    When method post
    Then status 200
    And match response == { errorMessage: 'This user already exist.' }

    # el password original sigue sirviendo
    Given path 'login'
    And request { username: '#(user.username)', password: '#(user.password)' }
    When method post
    Then status 200
    And match JSON.parse(response) == '#regex Auth_token: .+'

    # y el del segundo intento no quedo registrado
    Given path 'login'
    And request { username: '#(user.username)', password: '#(user.wrongPassword)' }
    When method post
    Then status 200
    And match response == { errorMessage: 'Wrong password.' }

  Scenario Outline: No registra si falta <caso>
    Given path 'signup'
    And request <body>
    When method post
    Then status 200
    And match response == { errorMessage: 'Bad parameter, missing username or password' }

    Examples:
      | caso         | body                                 |
      | el username  | { password: '#(newUser.password)' }  |
      | el password  | { username: '#(newUser.username)' }  |
      | todo el body | {}                                   |

  # BUG: con username vacio, null o de un tipo que no es texto la api se cae con un 500 en html
  @known-bug
  Scenario Outline: Signup con username <caso> deberia dar un error controlado
    Given path 'signup'
    And request { username: <username>, password: '#(newUser.password)' }
    When method post
    Then assert responseStatus < 500
    And match response == { errorMessage: '#string' }

    Examples:
      | caso      | username   |
      | vacio     | ''         |
      | null      | null       |
      | un objeto | { a: 1 }   |

  # BUG: la api no valida el password, registra al usuario aunque venga vacio, null o como numero
  @known-bug
  Scenario Outline: Signup con password <caso> no deberia registrar al usuario
    Given path 'signup'
    And request { username: '#(newUser.username)', password: <password> }
    When method post
    Then assert responseStatus < 500
    And match response == { errorMessage: '#string' }

    Examples:
      | caso      | password |
      | vacio     | ''       |
      | null      | null     |
      | un numero | 12345    |
