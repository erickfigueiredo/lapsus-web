# Lapsus WEB

Sistema WEB sob a arquitetura Single Page Application (SPA) desenvolvido por [Erick Figueiredo](https://github.com/erickfigueiredo) para consumir e interagir com a Lapsus API.

---

## Instruções de Configuração

Para configurar o endereço da API, bem como o tempo de espera por resposta, acesse o diretório:

```
./src/services/AxiosSettings.js
```

Dentro do arquivo, modifique os seguintes valores das variáveis com comentários à frente:

```
import axios from 'axios';

export default axios.create({ timeout: 4000 });

export const apiURL = 'http://localhost:3001'; // Endereço da API

export const lapsus = axios.create({
  baseURL: apiURL,
  timeout: 8000, // 8 segundos de espera por retorno
  headers: {
    'Content-Type': 'application/json',
  },
});

export const defaultErrorMessage = {
  success: false,
  message: 'Houve um erro de conexão com o servidor!',
};

```

---

## Configuração do projeto

```
yarn install
```

### Compila com "hot-reload" para desenvolvimento

```
yarn serve
```

### Compila e minifica para produção

```
yarn build
```

### Lints e consertos de arquivos

```
yarn lint
```

---

Painel de Controle desenvolvido por Erick Figueiredo sob a [Licença MIT](LICENSE).
