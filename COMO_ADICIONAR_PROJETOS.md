# 📝 Como Adicionar/Remover Projetos

Este guia explica como gerenciar seus projetos no portfólio de forma simples e rápida.

## 📍 Localização

Todos os projetos são gerenciados através do arquivo:
```
data/projects.json
```

## ➕ Adicionar um Novo Projeto

1. Abra o arquivo `data/projects.json`
2. Adicione um novo objeto seguindo o formato abaixo:

```json
{
  "id": 4,
  "title": "Nome do Projeto",
  "description": "Descrição curta em português (aparece no card)",
  "descriptionEn": "Short description in English (appears on card)",
  "image": "/projects/project4.jpg",
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "githubUrl": "https://github.com/seu-usuario/projeto4",
  "liveUrl": "https://projeto4.com",
  "featured": true,
  "longDescription": "Descrição detalhada em português (aparece na página interna do projeto). Você pode usar múltiplas linhas.\n\nUse \\n para quebrar linhas.",
  "longDescriptionEn": "Detailed description in English (appears on project internal page). You can use multiple lines.\n\nUse \\n to break lines.",
  "date": "Janeiro 2024",
  "dateEn": "January 2024",
  "screenshots": [
    "/projects/project4-screenshot1.jpg",
    "/projects/project4-screenshot2.jpg"
  ],
  "challenges": [
    "Desafio 1 em português",
    "Desafio 2 em português"
  ],
  "challengesEn": [
    "Challenge 1 in English",
    "Challenge 2 in English"
  ],
  "solutions": [
    "Solução 1 em português",
    "Solução 2 em português"
  ],
  "solutionsEn": [
    "Solution 1 in English",
    "Solution 2 in English"
  ]
}
```

### Campos Explicados:

**Campos Obrigatórios:**
- **id**: Número único sequencial (use o próximo número disponível)
- **title**: Nome do projeto
- **description**: Descrição curta em português (aparece no card da página principal)
- **descriptionEn**: Descrição curta em inglês (aparece no card da página principal)
- **image**: Caminho da imagem principal (coloque as imagens na pasta `public/projects/`)
- **technologies**: Array com as tecnologias usadas
- **githubUrl**: Link do repositório no GitHub (ou `null` se não tiver)
- **liveUrl**: Link do projeto em produção (ou `null` se não tiver)
- **featured**: `true` para aparecer na página principal, `false` para não aparecer

**Campos Opcionais (para página interna do projeto):**
- **longDescription**: Descrição detalhada em português (aparece na página interna)
- **longDescriptionEn**: Descrição detalhada em inglês (aparece na página interna)
- **date**: Data do projeto em português (ex: "Janeiro 2024")
- **dateEn**: Data do projeto em inglês (ex: "January 2024")
- **screenshots**: Array com caminhos de screenshots adicionais
- **challenges**: Array com desafios enfrentados em português
- **challengesEn**: Array com desafios enfrentados em inglês
- **solutions**: Array com soluções implementadas em português
- **solutionsEn**: Array com soluções implementadas em inglês

## ➖ Remover um Projeto

1. Abra o arquivo `data/projects.json`
2. Encontre o projeto que deseja remover
3. Delete todo o objeto (incluindo as chaves `{}` e a vírgula antes dele)
4. Certifique-se de que a vírgula está correta após o último projeto

## 🖼️ Adicionar Imagens de Projetos

1. Crie a pasta `public/projects/` se não existir
2. Adicione suas imagens nessa pasta
3. Use o nome do arquivo no campo `image` do JSON

**Exemplo:**
- Arquivo: `public/projects/meu-projeto.jpg`
- No JSON: `"image": "/projects/meu-projeto.jpg"`

## 💡 Dicas

- Mantenha os IDs sequenciais e únicos
- Use `featured: true` apenas para seus melhores projetos (recomendado 3-6 projetos)
- Se não tiver imagem, o projeto mostrará um ícone padrão
- Você pode deixar `githubUrl` ou `liveUrl` como `null` se não tiver
- **Páginas Internas**: Cada projeto tem uma página interna (`/projects/[id]`) onde você pode adicionar mais detalhes, screenshots, desafios e soluções
- Os campos opcionais permitem criar páginas internas ricas sem poluir o card da página principal

## 📋 Exemplo Completo

```json
[
  {
    "id": 1,
    "title": "E-commerce Platform",
    "description": "Plataforma completa de e-commerce com carrinho de compras e pagamento",
    "descriptionEn": "Complete e-commerce platform with shopping cart and payment",
    "image": "/projects/ecommerce.jpg",
    "technologies": ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    "githubUrl": "https://github.com/seu-usuario/ecommerce",
    "liveUrl": "https://ecommerce.exemplo.com",
    "featured": true
  },
  {
    "id": 2,
    "title": "Dashboard Analytics",
    "description": "Dashboard de analytics com gráficos interativos",
    "descriptionEn": "Analytics dashboard with interactive charts",
    "image": "/projects/dashboard.jpg",
    "technologies": ["React", "Python", "FastAPI", "Chart.js"],
    "githubUrl": "https://github.com/seu-usuario/dashboard",
    "liveUrl": null,
    "featured": true
  }
]
```

## 🔄 Após Fazer Alterações

1. Salve o arquivo `data/projects.json`
2. Se o servidor de desenvolvimento estiver rodando, ele atualizará automaticamente
3. Recarregue a página no navegador para ver as mudanças
