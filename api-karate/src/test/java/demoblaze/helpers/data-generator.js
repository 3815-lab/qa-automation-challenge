function fn(rawPassword) {
  var Base64 = Java.type('java.util.Base64');
  var UUID = Java.type('java.util.UUID');

  // el front de demoblaze manda el password en base64, se replica aca
  var encode = function (text) {
    return Base64.getEncoder().encodeToString(new java.lang.String(text).getBytes('UTF-8'));
  };

  var suffix = UUID.randomUUID().toString().substring(0, 8);
  var password = rawPassword || 'Test1234*';

  return {
    username: 'qa_' + java.lang.System.currentTimeMillis() + '_' + suffix,
    password: encode(password),
    wrongPassword: encode(password + '_wrong')
  };
}
