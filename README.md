# ch-backend-ddelcampo-entrega14
### Entrega 14 - Loggers, Gzip y Analisis de Performance

***
## Table of Contents
1. [Instalacion](#Instalacion)
2. [Mediciones de Compresion](#Mediciones-de-Compresion) 
   * [Medicion sin Compresion](#Sin-compresion) 
   * [Medicion con GZIP](#GZIP) 
4. [Mediciones de Performance](#Mediciones-de-Performance)
   * [Medicion Nativa Node](#ProfNodeJS) 
   * [Medicion con Artillery](#Artillery) 
   * [Medicion con Autocannon](#Autocannon)

***
<a name="Instalacion"></a>
## Instalacion

 
```
$ git clone https://github.com/chewydc/ch-backend-ddelcampo-entrega14.git
$ cd ch-backend-ddelcampo-entrega14
$ npm install
$ npm start
```

***
<a name="Mediciones-de-Compresion"></a>
## Mediciones de Compresion

<a name="Sin-compresion"></a>
### Sin compresion
```
http://localhost:8080/api/info 

Document
-----------------------------------------------------------------------------------------------------------------------------------------------
info              http://localhost:8080/info                                                    200 document    Other       1.2   kB  10  ms
handlebars.min.js https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js  200 script      info        20.6  kB  167 ms  
bootstrap.min.css https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css      200 stylesheet  info        25.1  kB  147 ms  
info.js           http://localhost:8080/js/info.js                                              200 script      info        1.2   kB  96  ms		
info              http://localhost:8080/api/info                                                200 fetch       info.js:20  467   B   143 ms	
info.hbs          http://localhost:8080/plantillas/info.hbs                                     200 fetch       info.js:16  1.4   kB  87  ms		
-----------------------------------------------------------------------------------------------------------------------------------------------
```
<a name="GZIP"></a>
### Compresion libreria GZIP

```
http://localhost:8080/api/info 

Document
-----------------------------------------------------------------------------------------------------------------------------------------------
info              http://localhost:8080/info                                                    200	document    Other       1.0   kB  82  ms	
handlebars.min.js https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js  200	script      info        20.2  kB  53  ms	
bootstrap.min.css https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css      200	stylesheet  info        24.5  kB  72  ms	
info.js           http://localhost:8080/js/info.js                                              200	script      info        1.2   kB  103 ms	
info              http://localhost:8080/api/info                                                200	fetch       info.js:20  467   B   176 ms			
info.hbs          http://localhost:8080/plantillas/info.hbs                                     200	fetch       info.js:16  1.4   kB  78  ms	
-----------------------------------------------------------------------------------------------------------------------------------------------
```



<a name="Mediciones-de-Performance"></a>
## Mediciones de Performance


-------------------------------------------------------------------
<a name="ProfNodeJS"></a>
### Medicion con --prof de NodeJS

```
$ node --prof src/server.js
$ node --prof-process .\nombreArchivo > process.log
```

1. Sin Log
 ```
 [Shared libraries]:
   ticks  total  nonlib   name
   2155   63.6%          C:\WINDOWS\SYSTEM32\ntdll.dll
   1222   36.1%          C:\Program Files\nodejs\node.exe
      2    0.1%          C:\WINDOWS\System32\KERNELBASE.dll

 [Summary]:
   ticks  total  nonlib   name
      9    0.3%  100.0%  JavaScript
      0    0.0%    0.0%  C++
      7    0.2%   77.8%  GC
   3379   99.7%          Shared libraries
```
2. Con Log
 ```
 [Shared libraries]:
   ticks  total  nonlib   name
   1523   54.8%          C:\Program Files\nodejs\node.exe
   1249   45.0%          C:\WINDOWS\SYSTEM32\ntdll.dll
      1    0.0%          C:\WINDOWS\System32\KERNEL32.DLL

 [Summary]:
   ticks  total  nonlib   name
      5    0.2%  100.0%  JavaScript
      0    0.0%    0.0%  C++
      6    0.2%  120.0%  GC
   2773   99.8%          Shared libraries
   ```
-------------------------------------------------------------------
<a name="Artillery"></a>
### Medicion con Artillery

```
$ artillery quick --count 50 --num 20 http://localhost:8080/info
```

1. Sin Log
```
Started phase 0, duration: 1s @ 20:39:23(-0300) 2022-02-11
Report @ 20:39:33(-0300) 2022-02-11
Elapsed time: 12 seconds
  Scenarios launched:  50
  Scenarios completed: 0
  Requests completed:  313
  Mean response/sec: 36.37
  Response time (msec):
    min: 5
    max: 3290
    median: 1399
    p95: 2883.1
    p99: 3173.6
  Codes:
    200: 313
```
```
Report @ 20:39:43(-0300) 2022-02-11
Elapsed time: 22 seconds
  Scenarios launched:  0
  Scenarios completed: 0
  Requests completed:  475
  Mean response/sec: 48.82
  Response time (msec):
    min: 460
    max: 1597
    median: 1023
    p95: 1491
    p99: 1564
  Codes:
    200: 475
```
```
Report @ 20:39:48(-0300) 2022-02-11
Elapsed time: 27 seconds
  Scenarios launched:  0
  Scenarios completed: 50
  Requests completed:  212
  Mean response/sec: 33.68
  Response time (msec):
    min: 64
    max: 1753
    median: 1008.5
    p95: 1590.1
    p99: 1740.9
  Codes:
    200: 212
```
```
All virtual users finished
Summary report @ 20:39:48(-0300) 2022-02-11
  Scenarios launched:  50
  Scenarios completed: 50
  Requests completed:  1000
  Mean response/sec: 40.27
  Response time (msec):
    min: 5
    max: 3290
    median: 1047
    p95: 2263
    p99: 2985
  Scenario counts:
    0: 50 (100%)
  Codes:
    200: 1000
```
2. Con Log

```
Started phase 0, duration: 1s @ 23:55:33(-0300) 2022-02-11
Report @ 23:55:43(-0300) 2022-02-11
Elapsed time: 13 seconds
  Scenarios launched:  50
  Scenarios completed: 0
  Requests completed:  529
  Mean response/sec: 58.07
  Response time (msec):
    min: 6
    max: 1827
    median: 948
    p95: 1252.2
    p99: 1790.4
  Codes:
    200: 529
```
```
Report @ 23:55:53(-0300) 2022-02-11
Elapsed time: 23 seconds
  Scenarios launched:  0
  Scenarios completed: 50
  Requests completed:  471
  Mean response/sec: 43.67
  Response time (msec):
    min: 64
    max: 1852
    median: 980
    p95: 1712.5
    p99: 1795
  Codes:
    200: 471
```
```
All virtual users finished
Summary report @ 23:55:53(-0300) 2022-02-11
  Scenarios launched:  50
  Scenarios completed: 50
  Requests completed:  1000
  Mean response/sec: 50.63
  Response time (msec):
    min: 6
    max: 1852
    median: 968.5
    p95: 1477.5
    p99: 1793.5
  Scenario counts:
    0: 50 (100%)
  Codes:
    200: 1000
```
-------------------------------------------------------------------
<a name="Autocannon"></a>
### Medicion con Autocannon

```
$ autocannon -c 100 -d 20 http://localhost:8080/info
```

1) Sin Log

Running 20s test @ http://localhost:8080/info
100 connections

    ┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐ 
    │ Stat    │ 2.5%   │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
    ├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
    │ Latency │ 162 ms │ 1096 ms │ 3268 ms │ 3580 ms │ 1188.01 ms │ 694.78 ms │ 3909 ms │
    └─────────┴────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘ 
    
    ┌───────────┬───────┬───────┬────────┬────────┬───────┬─────────┬───────┐  
    │ Stat      │ 1%    │ 2.5%  │ 50%    │  97.5% │ Avg   │ Stdev   │ Min   │  
    ├───────────┼───────┼───────┼────────┼────────┼───────┼─────────┼───────┤  
    │ Req/Sec   │ 15    │ 15    │ 94     │  112   │ 81.8  │ 26.78   │ 15    │  
    ├───────────┼───────┼───────┼────────┼────────┼───────┼─────────┼───────┤  
    │ Bytes/Sec │ 18 kB │ 18 kB │ 113 kB │  134 kB│ 98 kB │ 32.1 kB │ 18 kB │  
    └───────────┴───────┴───────┴────────┴────────┴───────┴─────────┴───────┘  
 
Se adjunta diagrama de flama, archivo: "Grafico_0xSinLog.JPG"
![Image text](https://github.com/chewydc/ch-backend-ddelcampo-entrega14/blob/c4f62b4ac4432ad1247e0cc9db40623440c280ec/Grafico_0xSinLog.JPG)


2) Con Log

Running 20s test @ http://localhost:8080/info
100 connections

    ┌─────────┬────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐   
    │  Stat   | 2.5%   │ 50%     │  97.5%  │  99%    │  Avg       │ Stdev     │ Max     │       
    ├─────────┼────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤   
    │ Latency │ 255 ms │ 1080 ms │ 3301 ms │ 3670 ms │ 1238.14 ms │ 691.97 ms │ 3975 ms │   
    └─────────┴────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘   
    
    ┌───────────┬─────────┬─────────┬─────────┬────────┬─────────┬───────┬─────────┐   
    │ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%  │ Avg     │ Stdev │ Min     │   
    ├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼───────┼─────────┤   
    │ Req/Sec   │ 18      │ 18      │ 83      │ 122    │ 79.25   │ 29.2  │ 18      │   
    ├───────────┼─────────┼─────────┼─────────┼────────┼─────────┼───────┼─────────┤   
    │ Bytes/Sec │ 21.6 kB │ 21.6 kB │ 99.5 kB │ 146 kB │ 94.9 kB │ 35 kB │ 21.6 kB │   
    └───────────┴─────────┴─────────┴─────────┴────────┴─────────┴───────┴─────────┘   


Se adjunta diagrama de flama, archivo: "Grafico_0xConLog.JPG"
![Image text](https://github.com/chewydc/ch-backend-ddelcampo-entrega14/blob/c4f62b4ac4432ad1247e0cc9db40623440c280ec/Grafico_0xConLog.JPG)


