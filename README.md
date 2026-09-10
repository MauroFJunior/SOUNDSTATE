# SOUNDSTATE

Projeto individual 3SEM: o savestate das suas músicas.

## Pré-requisitos

- Node.js e npm
- Java 21
- IntelliJ IDEA

## Como executar

### Back-end

- Abra a pasta `soundstateBack` no IntelliJ.
- Aguarde o Maven baixar as dependências.
- Execute a aplicação pelo botão **Play** do IntelliJ.
- API: `http://localhost:8080`

### Front-end

Na pasta /soundstate:

npm install
npm run dev


- Acesse: `http://localhost:5173`

## Endpoints utilizados

Base URL: `http://localhost:8080`

### GET `/songs`

- Lista as músicas cadastradas.
- Retorno: `200 OK`

```json
[
	{
		"id": 1,
		"name": "Nome da música",
		"artist": "Artista",
		"genre": "Gênero",
		"album": "Álbum",
		"year": 2026,
		"durSec": 180,
		"artwork": "https://exemplo.com/capa.jpg"
	}
]
```

### POST `/songs`

- Cadastra uma música.
- Retorno: `201 Created`
- Erro: `400 Bad Request` para dados inválidos; `409 Conflict` para música duplicada.

```json
{
	"name": "Nome da música",
	"artist": "Artista",
	"genre": "Gênero",
	"album": "Álbum",
	"year": 2026,
	"durSec": 180,
	"artwork": "https://exemplo.com/capa.jpg"
}
```
