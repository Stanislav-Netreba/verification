Скачати це все діло 

Створити файл `config.json` в папці `configs` зі структурою:
```json
{
    "token": "token",
    "prefix": "!",
    "serwer_info": {
        "id_channel": "айді старт каналу",
        "verified_roles": ["список ролей, котрі не треба верифікувати при вході"],
        "start_role": "роль при вході",
        "clan_role": "роль клану",
        "another_clan_role": "інша роль",
        "main_clan_name": "назва основного клану"
    },
    "application_id": "айді аплікації АПІ танків"
}```

Запустити команди:

`npm install`
`nmp run start`
