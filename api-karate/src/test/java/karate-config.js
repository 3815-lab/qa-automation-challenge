function fn() {
  var env = karate.env || 'prod';
  karate.log('karate.env:', env);

  // por ahora demoblaze solo expone un ambiente, queda listo para sumar otros
  var baseUrls = {
    prod: 'https://api.demoblaze.com'
  };

  var config = {
    env: env,
    baseUrl: baseUrls[env] || baseUrls.prod,
    defaultPassword: 'Test1234*'
  };

  config.decodeBase64 = function (text) {
    var Base64 = Java.type('java.util.Base64');
    return new java.lang.String(Base64.getDecoder().decode(text), 'UTF-8');
  };

  karate.configure('connectTimeout', 10000);
  karate.configure('readTimeout', 20000);
  karate.configure('headers', { 'Content-Type': 'application/json' });

  return config;
}
