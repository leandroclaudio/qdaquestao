# 🎯 Q de Questão — Projetos e Cadernos de Estudo com Repetição Espaçada

Uma plataforma web leve, rápida, widescreen e 100% *offline-first* (PWA) para estudo ativo de alto rendimento. Organiza seus estudos em **Projetos → Cadernos Temáticos → Questões**, utilizando o **Sistema de Leitner** para agendar revisões espaçadas inteligentes.

🔗 **Hospedagem:** o app é publicado no **Netlify**, porque a sincronização entre aparelhos usa Netlify Functions + Netlify Blobs. Em hospedagens só estáticas (como GitHub Pages) ele funciona normalmente, mas sem sincronização.

---

## ✨ Principais Funcionalidades

- **🏛️ Hierarquia em 3 Níveis (`Projetos → Cadernos → Questões`):**
  - Crie **Projetos** para objetivos distintos (ex.: *Concurso ABDI*, *Certificação AWS*, *Pós-Graduação*) com ícone e descrição personalizados.
  - Dentro de cada projeto, crie **Cadernos Temáticos** para cada matéria do edital, escolhendo um **ícone exclusivo** em uma paleta visual (ou digitando qualquer emoji).
- **✍️ 3 Formatos de Questão Suportados:**
  1. **Múltipla Escolha (`multipla`):** De 2 a 5 alternativas (`A` a `E`), com botão `✂` (ou clique direito) para riscar alternativas descartadas.
  2. **Certo ou Errado (`ce`):** Formato clássico de bancas como Cebraspe, com atalhos rápidos `C` e `E`.
  3. **Preencher Lacuna (`lacuna`):** Digite a resposta diretamente no teclado! Ignora maiúsculas/minúsculas e acentos, aceita múltiplos sinônimos separados por `|` (ex.: `LGPD | Lei 13.709`) e possui botão para validar manualmente respostas equivalentes. Uma mesma questão pode ter **várias lacunas** (`;;` separa as respostas) e **ordem livre** (prefixo `~`).
- **🎯 Revisão Inteligente (Sistema de Leitner):** Cada questão possui uma caixa de `1` a `5`. Ao acertar uma questão vencida, ela avança de caixa e tem sua revisão espaçada no tempo (`1`, `3`, `7`, `16` e `35` dias por padrão, totalmente configurável). Acertos antes do vencimento contam nas estatísticas, mas mantêm a caixa e a data. Ao errar, ela retorna à Caixa 1 para revisão imediata no mesmo dia.
- **📖 Wiki / Guia Interativo Integrado:** Aba **Guia** explicando visualmente o método de Leitner, as datas de revisão, a estrutura do CSV e trazendo um **Prompt pronto para copiar** e gerar questões com IA.
- **📊 Estatísticas & Ofensiva (Streak):** Acompanhe sua acurácia global e por caderno, dias seguidos de estudo (ofensiva 🔥), gráfico de atividade dos últimos 7 dias e distribuição do banco nas 5 Caixas de Leitner.
- **💾 Memória Persistente Dupla (`localStorage` + `IndexedDB`):** Todos os projetos, cadernos e questões ficam salvos automaticamente no armazenamento permanente do navegador, com opção de **Exportar / Restaurar Backup Completo em JSON**.
- **☁️ Sincronização entre aparelhos (PC e celular):** Em *Ajustes*, gere uma chave secreta (🎲) e use a mesma chave nos dois aparelhos. A sincronização é automática e **mescla item a item**: cada questão, projeto e caderno guarda a data da última alteração, vence a versão mais recente, exclusões se propagam e o histórico de respostas é unido. Estudar offline em um aparelho não apaga o que foi feito no outro.

---

## 📄 Formato do CSV para Importação

Você pode importar os 3 tipos de questão no mesmo arquivo `.csv`. O separador (`,`, `;` ou `Tab`) é detectado automaticamente.

### Colunas Aceitas

| Coluna | Obrigatória? | Como preencher em cada tipo de questão |
| :--- | :---: | :--- |
| `enunciado` | **Sim** | Texto da pergunta. Em questões de lacuna, use `___` (três sublinhados) para cada espaço em branco (pode haver mais de um). |
| `a`, `b`, `c`, `d`, `e` | Só em Múltipla Escolha | Texto das alternativas. Em questões de **Lacuna** ou **Certo/Errado**, deixe vazias! |
| `correta` | **Sim** | • **Múltipla Escolha:** letra (`a`–`e`).<br>• **Certo/Errado:** `Certo` ou `Errado`.<br>• **Lacuna:** resposta esperada. Use `\|` para aceitar sinônimos (ex.: `LGPD \| Lei 13.709`). Com várias lacunas (`___`), separe as respostas com `;;` (ex.: `limites ;; critérios`). Se a ordem for livre, comece com `~` (ex.: `~ publicidade ;; eficiência`). |
| `projeto` | Opcional | Nome do Projeto (ex.: `Concurso ABDI`). |
| `tema` | Opcional | Nome do Caderno Temático (ex.: `Estatística`, `Políticas Públicas e LGPD`). |
| `tipo` | Opcional | `multipla`, `ce` ou `lacuna` (detectado automaticamente se omitido). |
| `dificuldade`| Opcional | `Fácil`, `Média` ou `Difícil`. |
| `explicacao` | Opcional | Comentário / justificativa do gabarito exibido após responder. |

### Exemplo de CSV com os 3 tipos de questão

```csv
enunciado,a,b,c,d,correta,projeto,tema,tipo,dificuldade,explicacao
"O que a mediana representa em uma distribuição?","A média dos valores","O valor que divide os dados ao meio","O valor mais frequente","A diferença entre máximo e mínimo",b,Concurso ABDI,Estatística,multipla,Fácil,"A mediana é o valor central: 50% dos dados ficam abaixo e 50% acima dela."
"A ___ (sigla) é a lei brasileira (Lei nº 13.709/2018) que regula a proteção de dados pessoais.",,,,,LGPD | Lei Geral de Proteção de Dados,Concurso ABDI,Políticas Públicas e LGPD,lacuna,Fácil,"A LGPD entrou em vigor em 2020."
"Segundo a LGPD, o tratamento de dados pessoais sensíveis dispensa hipótese legal quando realizado pelo poder público.",,,,,Errado,Concurso ABDI,Políticas Públicas e LGPD,ce,Média,"Errado. O poder público também deve observar o art. 11 da LGPD."
```

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/leandroclaudio/qdaquestao.git
   cd qdaquestao
   ```
2. **Sem sincronização** (só o app): sirva a pasta e acesse `http://localhost:8000`.
   ```bash
   python3 -m http.server 8000
   ```
3. **Com sincronização:** use o Netlify CLI, que também roda a função `netlify/functions/sync.mjs`.
   ```bash
   npm install
   npx netlify dev
   ```

### 🔐 Sobre a chave de sincronização

- A chave é a única proteção dos dados na nuvem: trate-a como uma senha. Chaves novas precisam de pelo menos 16 caracteres; o botão 🎲 gera uma aleatória.
- No servidor, a chave nunca é guardada: os dados ficam sob o hash SHA-256 dela. Ela só é aceita pelo cabeçalho `x-sync-key` (nunca pela URL), e cada envio tem limite de 5 MB.
- Chaves curtas antigas continuam funcionando até serem trocadas em *Ajustes › 🔐 Trocar chave*, que copia os dados para uma chave forte e desativa a antiga.

---

## 📝 Licença

Este projeto é de código aberto e pode ser livremente utilizado, estudado e modificado.
