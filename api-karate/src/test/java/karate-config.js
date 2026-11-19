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

  karate.configure('connectTimeout', 10000);
  karate.configure('readTimeout', 20000);
  karate.configure('headers', { 'Content-Type': 'application/json' });

  return config;
}
