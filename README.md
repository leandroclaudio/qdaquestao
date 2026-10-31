# 🎯 Q de Questão — Projetos e Cadernos de Estudo com Repetição Espaçada

Uma plataforma web leve, rápida, widescreen e 100% *offline-first* (PWA) para estudo ativo de alto rendimento. Organiza seus estudos em **Projetos → Cadernos Temáticos → Questões**, utilizando o **Sistema de Leitner** para agendar revisões espaçadas inteligentes.

🔗 **Acesse online:** [https://leandroclaudio.github.io/qdaquestao/](https://leandroclaudio.github.io/qdaquestao/)

---

## ✨ Principais Funcionalidades

- **🏛️ Hierarquia em 3 Níveis (`Projetos → Cadernos → Questões`):**
  - Crie **Projetos** para objetivos distintos (ex.: *Concurso ABDI*, *Certificação AWS*, *Pós-Graduação*) com ícone e descrição personalizados.
  - Dentro de cada projeto, crie **Cadernos Temáticos** para cada matéria do edital, escolhendo um **ícone exclusivo** em uma paleta visual (ou digitando qualquer emoji).
- **✍️ 3 Formatos de Questão Suportados:**
  1. **Múltipla Escolha (`multipla`):** De 2 a 5 alternativas (`A` a `E`), com botão `✂` (ou clique direito) para riscar alternativas descartadas.
  2. **Certo ou Errado (`ce`):** Formato clássico de bancas como Cebraspe, com atalhos rápidos `C` e `E`.
  3. **Preencher Lacuna (`lacuna`):** Digite a resposta diretamente no teclado! Ignora maiúsculas/minúsculas e acentos, aceita múltiplos sinônimos separados por `|` (ex.: `LGPD | Lei 13.709`) e possui botão para validar manualmente respostas equivalentes.
- **🎯 Revisão Inteligente (Sistema de Leitner):** Cada questão possui uma caixa de `1` a `5`. Ao acertar, a questão avança de caixa e tem sua revisão espaçada no tempo (`1`, `3`, `7`, `16` e `35` dias por padrão, totalmente configurável). Ao errar, ela retorna à Caixa 1 para revisão imediata no mesmo dia.
- **📖 Wiki / Guia Interativo Integrado:** Botão **Como Funciona** na barra superior explicando visualmente o método de Leitner, as datas de revisão, a estrutura do CSV e trazendo um **Prompt pronto para copiar** e gerar questões com IA.
- **📊 Estatísticas & Ofensiva (Streak):** Acompanhe sua acurácia global e por caderno, dias seguidos de estudo (ofensiva 🔥), gráfico de atividade dos últimos 7 dias e distribuição do banco nas 5 Caixas de Leitner.
- **💾 Memória Persistente Dupla (`localStorage` + `IndexedDB`):** Todos os projetos, cadernos e questões ficam salvos automaticamente no armazenamento permanente do navegador, com opção de **Exportar / Restaurar Backup Completo em JSON**.

---

## 📄 Formato do CSV para Importação

Você pode importar os 3 tipos de questão no mesmo arquivo `.csv`. O separador (`,`, `;` ou `Tab`) é detectado automaticamente.

### Colunas Aceitas

| Coluna | Obrigatória? | Como preencher em cada tipo de questão |
| :--- | :---: | :--- |
| `enunciado` | **Sim** | Texto da pergunta. Em questões de lacuna, use `___` (três sublinhados) para destacar o espaço em branco. |
| `a`, `b`, `c`, `d`, `e` | Só em Múltipla Escolha | Texto das alternativas. Em questões de **Lacuna** ou **Certo/Errado**, deixe vazias! |
| `correta` | **Sim** | • **Múltipla Escolha:** letra (`a`–`e`).<br>• **Certo/Errado:** `Certo` ou `Errado`.<br>• **Lacuna:** resposta esperada. Use `\|` para aceitar sinônimos (ex.: `LGPD \| Lei 13.709`). |
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
2. Sirva a pasta localmente (ou abra `index.html` no navegador):
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000`.

---

## 📝 Licença

Este projeto é de código aberto e pode ser livremente utilizado, estudado e modificado.
