# 🎨 Personalizar seu Portfólio

Este guia mostra como personalizar as informações do seu portfólio.

## 📝 Informações Pessoais

### 1. Dados de Contato

Edite o componente `components/Contact.tsx` e atualize as informações:

```tsx
// Linha ~60-80
<p className="text-gray-400 text-sm">seu.email@exemplo.com</p>
<p className="text-gray-400 text-sm">+55 (00) 00000-0000</p>
<p className="text-gray-400 text-sm">Brasil</p>
```

### 2. Sobre Mim

Edite o arquivo `data/translations/pt.json` e `data/translations/en.json`:

```json
{
  "about": {
    "description": "Sua descrição aqui...",
    "description2": "Mais informações sobre você..."
  }
}
```

### 3. Hero Section (Título Principal)

Edite `data/translations/pt.json` e `data/translations/en.json`:

```json
{
  "hero": {
    "title": "Seu Título Aqui",
    "subtitle": "Sua descrição profissional"
  }
}
```

### 4. Habilidades

Edite o arquivo `data/skills.json` para adicionar/remover habilidades:

```json
{
  "languages": [
    { "name": "PHP", "level": "advanced" },
    { "name": "Python", "level": "advanced" }
  ],
  "frameworks": [...],
  "tools": [...],
  "learning": [...]
}
```

**Níveis disponíveis:** `beginner`, `intermediate`, `advanced`

### 5. Experiência Profissional

Edite o arquivo `data/experience.json`:

```json
[
  {
    "id": 1,
    "title": "Seu Cargo",
    "titleEn": "Your Position",
    "company": "Nome da Empresa",
    "companyEn": "Company Name",
    "location": "Localização",
    "locationEn": "Location",
    "startDate": "2023",
    "endDate": null,
    "current": true,
    "description": [
      "Responsabilidade 1",
      "Responsabilidade 2"
    ],
    "descriptionEn": [
      "Responsibility 1",
      "Responsibility 2"
    ]
  }
]
```

## 🎨 Personalizar Cores

Edite o arquivo `tailwind.config.ts` para alterar a paleta de cores:

```typescript
colors: {
  primary: {
    // Ajuste os valores hexadecimais aqui
    500: "#9333ea", // Roxo principal
    600: "#7e22ce",
    // ...
  }
}
```

## 🌐 Configurar Formulário de Contato

Para fazer o formulário funcionar de verdade, você precisa integrar um serviço de email.

### Opção 1: Resend (Recomendado)

1. Crie uma conta em [resend.com](https://resend.com)
2. Obtenha sua API Key
3. Crie um arquivo `.env.local`:

```
RESEND_API_KEY=sua_api_key_aqui
```

4. Descomente e configure o código em `app/api/contact/route.ts`

### Opção 2: SendGrid

Similar ao Resend, mas usando SendGrid.

### Opção 3: Nodemailer

Configure Nodemailer com seu provedor de email.

## 📸 Adicionar Imagens

1. Coloque suas imagens de projetos em `public/projects/`
2. Use o caminho `/projects/nome-da-imagem.jpg` no JSON de projetos

## 🔗 Links Sociais (Opcional)

Se quiser adicionar links para GitHub, LinkedIn, etc., você pode:

1. Adicionar no componente `Footer.tsx` ou criar um novo componente
2. Adicionar ícones usando `react-icons`

## 📱 Meta Tags (SEO)

Edite `app/layout.tsx` para personalizar:

```typescript
export const metadata: Metadata = {
  title: "Seu Nome - Desenvolvedor Full Stack",
  description: "Sua descrição para SEO",
};
```
