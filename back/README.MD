Project

    Name: controllo alimentare

    Version:
        1.0.0:
            - Nuova icona app (Hamburger)
            - Aggiunta icone per tipologia di pasto
            - Fix grafo Kcal per Day
            - Modifica allo style tabella (desktop)
            - Bug funzione modifica
            - Layout mobile
            - Fix grafo on data_change
            - Controlli vari signUp
            - Allungamento expire della sessione (10 gg)


    To Do:

    Links:
        Vuejs charts - https://madewithvuejs.com/charts
        Vuejs-google-chart - https://github.com/devstark-com/vue-google-charts?ref=madewithvuejs.com
        Anychart (pagamento...) - https://www.anychart.com/

# Esempi di test
CURL esempio di richiesta:
- curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/data

# Richieste utili
- curl http://localhost:8080/api/v1/peso/
- curl -d "username=mageox&password=password" http://localhost:8080/api/v1/user/login