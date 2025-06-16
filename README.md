## Como rodar o projeto

1. **Clona o repositório**
   ```bash
   git clone https://github.com/guerrafs/SiteIHC.git
   ```

2. **Abrir com Live Server (se tiver VS Code)**
   - Abre a pasta no VS Code
   - Instala a extensão "Live Server" se não tiver
   - Clica com botão direito no `index.html`
   - Escolhe "Open with Live Server"
   - Vai abrir numa porta local tipo `http://localhost:5500`

## Como funciona
O site faz o seguinte:
1. Carrega dados de 6 abas diferentes do Google Sheets
2. Usa a biblioteca PapaParse pra ler os CSVs
3. Usa a biblioteca Chart.js pra fazer os gráficos

## URLs dos dados
Os dados vem dessas URLs do Google Sheets (publiquei como CSV):

- **Gráfico 1:** gid=1454563529 (Transplantes Brasil)
- **Gráfico 2:** gid=1083333708 (Pacientes na Lista)  
- **Gráfico 3:** gid=1604091063 (Mortalidade USA)
- **Gráfico 4:** gid=1488328750 (Patient List)
- **Gráfico 5:** gid=906573690 (Patients Year - Gráfico 1)
- **Gráfico 6:** gid=906573690 (Patients Year - Gráfico 2)
- **Gráfico 7:** gid=1083333708 (Mortality, mas invertido)

## Se der problema
Se algum gráfico não aparecer:
1. Abre o F12 (DevTools) no navegador
2. Vai na aba "Console" 
3. Vê se tem algum erro vermelho
4. Se tiver erro de CORS, tenta rodar com um servidor local
5. Se não conseguir, me chama que eu ajudo

## Bibliotecas usadas
- Chart.js (pra fazer os gráficos) - https://www.chartjs.org/
- PapaParse (pra ler CSV) - https://www.papaparse.com/

## Observações importantes
- Os dados vem direto do Google Sheets, então se mudar lá vai mudar aqui também
- Internet é obrigatória pra funcionar
- Se o Google Sheets sair do ar, vai dar erro (não é culpa minha)
- O código ta meio bagunçado mas funciona 