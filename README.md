# Zombie API

API oparte na `Typescript`, `Fastify`, używające `Mongoose` do łączenia się z bazą Mongo oraz `Redisa` do cachowania danych.

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

Do sprawdzenia czy są cachowane dane w `Redis` można użyć polecenia `redis-cli -a 123 --scan` w środku kontenera

## FYI

Co do tego punktu
```
We use an external item exchange for our zombie (we pay for every request), the prices of items on the exchange are updated daily at 00:00 UTC and are in Polish zlotys.
```
Nie byłem pewny w jaki sposób ma być to rozwiązane, więc pozwoliłem sobie na własną interpretacje :)
## PATCH | /zombie/{zombieId}/items/exchange

Endpoint umożliwia wymianę itemu dla danego zombie na jeden z dostępnych w udostępnionym przez was API. Przez to, że dane są aktualizowane raz na dzień oraz każdy request jest płatny to zastosowałem cachowanie itemów na podstawie nazwy itemu. Czas przez jaki dane są zcachowane jest wyliczany na podstawie `rożnicy między północą, a godziną requestu`.

Komunikat wejściowy
```
{
  "itemToExchange": "Elytra",
  "itemToGet": "Trident"
}
```


> Rzeczy, które są jeszcze do zrobienia, ale zabrało czasu:
> * testy
> * obsługa błędów
> * logowowanie
> * bardziej obszerna i szczegółowa dokumentacja :)
