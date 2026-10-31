# Mini-frontend pentru un API REST
Link live: https://ascalon24.github.io/tema-api/
API: https://jsonplaceholder.typicode.com/posts (GET, POST, DELETE)
CORS: serverul trimite Access-Control-Allow-Origin, nu a trebuit să fac nimic.
GET 200: afișez 10 postări; listă goală: "Nu există postări."
POST 201: adaug postarea prima în listă, fără reîncărcare.
POST 4xx: afișez mesajul serverului sub formular.
DELETE 200: scot postarea din pagină; altfel afișez eroarea.
Eroare de rețea: "Nu s-a putut contacta serverul."
Ștergerea folosește delegarea evenimentelor (un listener pe listă).
