# 🎯 Q de Questão — Banco de Questões com Repetição Espaçada

Uma aplicação web leve, rápida e 100% *offline-first* (PWA) para estudo ativo por questões de múltipla escolha. Utiliza o **Sistema de Leitner** para agendar revisões inteligentes, além de oferecer simulados cronometrados, estatísticas detalhadas e importação flexível via CSV.

🔗 **Acesse online:** [https://leandroclaudio.github.io/qdaquestao/](https://leandroclaudio.github.io/qdaquestao/)

---

## ✨ Principais Funcionalidades

- **📚 Tela Inicial de Cadernos Temáticos:** Organize seus estudos por matéria/disciplina em **Cadernos Temáticos** independentes (ou use o *Caderno Geral* para estudar tudo misturado). Cada caderno exibe seu próprio progresso, questões vencidas hoje e acurácia.
- **🖥️ Layout Widescreen Responsivo (Desktop & Mobile):** Interface ampla em múltiplas colunas para telas de computador (até `1120px`), mantendo ergonomia de aplicativo móvel no celular.
- **🎯 Revisão Inteligente (Sistema de Leitner):** Cada questão possui uma caixa de `1` a `5`. Ao acertar, a questão avança de caixa e tem sua revisão espaçada no tempo (`1`, `3`, `7`, `16` e `35` dias por padrão, totalmente configurável). Ao errar, ela retorna à Caixa 1 para fixação imediata.
- **⏱️ Modo Simulado (Modo Prova + Cronômetro):** Responda a uma seleção aleatória de questões com cronômetro em tempo real. No *Modo Prova*, o gabarito e as explicações só são revelados ao final da sessão, junto com o tempo total e o tempo médio por questão.
- **✂️ Eliminação de Alternativas (Riscar Opções):** Descarte alternativas durante a leitura clicando no botão `✂` (ou com o botão direito do mouse), exatamente como em uma prova física.
- **⌨️ Atalhos de Teclado (Desktop):**
  - `A`–`E` ou `1`–`5`: Seleciona a alternativa correspondente
  - `Enter` ou `Espaço`: Confirma a resposta / Avança para a próxima questão
  - `Esc`: Sai da sessão ou fecha janelas modais
- **🗂️ Gerenciador de Questões Integrado:** Busque questões por palavra-chave, filtre por caderno, crie novas questões manualmente, edite enunciados/gabaritos ou exclua itens individuais.
- **📊 Estatísticas & Ofensiva (Streak):** Acompanhe sua acurácia global e por caderno, dias seguidos de estudo (ofensiva 🔥), gráfico de atividade dos últimos 7 dias e distribuição do banco nas 5 Caixas de Leitner.
- **🌓 Tema Claro, Escuro ou Automático:** Adapta-se ao sistema operacional ou permite escolha manual nos Ajustes.
- **💾 Memória Persistente Dupla (`localStorage` + `IndexedDB`):** Todas as questões e cadernos adicionados ficam salvos automaticamente no armazenamento permanente do navegador, com opção de **Exportar / Restaurar Backup Completo em JSON**.

---

## 📄 Formato do CSV para Importação

Você pode importar planilhas `.csv` arrastando o arquivo para a tela de importação ou colando o texto diretamente. O separador (`,`, `;` ou `Tab`) é detectado automaticamente.

### Colunas Aceitas

| Coluna | Obrigatória? | Descrição / Sinônimos aceitos no cabeçalho |
| :--- | :---: | :--- |
| `enunciado` | **Sim** | Texto da pergunta (`pergunta`, `questao`, `texto`) |
| `a`, `b` | **Sim** | Primeiras duas alternativas (`alternativa_a`, `alternativa_b`) |
| `c`, `d`, `e` | Opcional | Demais alternativas (suporta questões de 2 a 5 opções) |
| `correta` | **Sim** | Letra da alternativa correta (`a`–`e`) ou texto exato da resposta (`gabarito`, `resposta`) |
| `tema` | Opcional | Disciplina ou assunto (`assunto`, `materia`, `disciplina`, `categoria`) |
| `dificuldade`| Opcional | Nível da questão: `Fácil`, `Média` ou `Difícil` (`nivel`) |
| `explicacao` | Opcional | Comentário exibido após responder (`justificativa`, `comentario`, `gabarito comentado`) |

### Exemplo de CSV

```csv
enunciado,a,b,c,d,correta,tema,dificuldade,explicacao
"O que a mediana representa em uma distribuição?","A média dos valores","O valor que divide os dados ao meio","O valor mais frequente","A diferença entre máximo e mínimo",b,Estatística,Fácil,"A mediana é o valor central: 50% dos dados ficam abaixo e 50% acima dela."
"Em SQL, qual cláusula filtra grupos criados pelo GROUP BY?","WHERE","ORDER BY","HAVING","DISTINCT",c,Banco de Dados,Média,"WHERE filtra linhas antes do agrupamento; HAVING filtra os grupos após o GROUP BY."
```

---

## 🤖 Dica: Gerando Questões com IA (ChatGPT, Claude, Gemini)

Você pode usar qualquer IA para gerar bancos de questões sob medida a partir de seus resumos, PDFs ou editais. Basta copiar o prompt abaixo:

> **Prompt sugerido:**
> ```text
> Crie 15 questões de múltipla escolha sobre [TEMA OU CONTEÚDO] em formato CSV.
> Use exatamente este cabeçalho na primeira linha:
> enunciado,a,b,c,d,correta,tema,dificuldade,explicacao
> 
> Regras:
> 1. Envolva todos os campos de texto entre aspas duplas ("...").
> 2. Na coluna "correta", coloque apenas a letra minúscula correspondente (a, b, c ou d).
> 3. Na coluna "dificuldade", classifique entre Fácil, Média ou Difícil.
> 4. Na coluna "explicacao", escreva uma justificativa objetiva do gabarito.
> 5. Retorne apenas o bloco de código CSV pronto para copiar.
> ```

---

## 🚀 Como Executar Localmente

O projeto não possui dependências externas nem requer etapa de *build*:

1. Clone o repositório:
   ```bash
   git clone https://github.com/leandroclaudio/qdaquestao.git
   cd qdaquestao
   ```
2. Abra o arquivo `index.html` diretamente no navegador ou sirva a pasta localmente (recomendado para ativar o *Service Worker* do PWA):
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000` no navegador.

---

## 🗂️ Estrutura do Projeto

```text
├── index.html            # Aplicação completa (HTML + CSS + JS modularizado)
├── exemplo-questoes.csv  # Banco de questões de exemplo pronto para importação
├── manifest.json         # Manifesto Web App (PWA)
├── sw.js                 # Service Worker para funcionamento offline
├── icon.svg              # Ícone vetorial da aplicação
└── README.md             # Documentação do projeto
```

---

## 📝 Licença

Este projeto é de código aberto e pode ser livremente utilizado, estudado e modificado.
