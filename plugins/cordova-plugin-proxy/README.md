## 用法：
```
this.proxy.connect({
  server_addr: "106.14.145.247",
  server_port: 7000,
  ctype: "stcp",
  server_name: "mu2000",
  bind_addr: "127.0.0.1",
  bind_port: 8554
}).then((res: any) => console.log("success:",res))
  .catch((error: any) => console.error("error:",error));
```
