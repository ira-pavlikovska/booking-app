const https = require("https");
const httpProxy = require("http-proxy");
const parseString = require('xml2js').parseString;

const key = 'RDfV4oPehM6jNhxfNQzzQ'

const proxy = httpProxy
  .createProxyServer({
    target: "https://www.goodreads.com",
    agent: https.globalAgent,
    secure: false,
    headers: {
      host: "www.goodreads.com",
      "accept-encoding": "", // disable gzip
    },
  })
  .listen(8000);

proxy.on("proxyRes", (proxyRes, req, res) => {
  const _write = res.write;
  let body = "";
  proxyRes.on('data', function(data) {
    body += data;
  });

  res.write = function (data) {
    try{
      parseString(body, function (err, result) {
        _write.call(res,JSON.stringify(result));
      });
    } catch (err) {}
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
});


proxy.on('proxyReq', (proxyReq) => {
  proxyReq.path = `${proxyReq.path}&key=${key}`
});

console.log(`Proxy is running ...`);
