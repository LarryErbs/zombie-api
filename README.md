# Zombie API

Aplikacja jest w pełni `zdockeryzowana`. Do uruchomienia potrzebny jest zainstalowany `Docker` oraz `Docker compose` 

```
docker-compose -f "docker-compose.yaml" up -d --build
```

Do API dostępny jest `Swagger` z każdym opisanym endpointem
```
http://localhost:3000/swagger/static/index.html
```

API komunikuuje się z bazą `MongoDB`. Aby ułatwić podgląd uruchomione jest `Mongo Express` dostępne pod adresem
```
http://localhost:8081/
```

API integruje się z `NBP API` w celu pobrania dziennych kursów walut
```
https://api.nbp.pl/api/exchangerates/tables/a/
```