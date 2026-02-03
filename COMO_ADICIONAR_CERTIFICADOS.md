# 📜 Como Adicionar/Remover Certificados

Este guia explica como gerenciar seus certificados e qualificações no portfólio.

## 📍 Localização

Todos os certificados são gerenciados através do arquivo:
```
data/certificates.json
```

## ➕ Adicionar um Novo Certificado

1. Abra o arquivo `data/certificates.json`
2. Adicione um novo objeto seguindo o formato abaixo:

```json
{
  "id": 3,
  "title": "Nome do Certificado",
  "titleEn": "Certificate Name",
  "issuer": "Nome da Instituição",
  "issuerEn": "Institution Name",
  "date": "Janeiro 2024",
  "dateEn": "January 2024",
  "credentialId": "CERT-12345",
  "credentialUrl": "https://exemplo.com/verificar-certificado",
  "image": "/certificates/certificado.jpg",
  "description": "Descrição do certificado em português",
  "descriptionEn": "Certificate description in English",
  "ects": 6
}
```

### Campos Explicados:

**Campos Obrigatórios:**
- **id**: Número único sequencial
- **title**: Nome do certificado em português
- **titleEn**: Nome do certificado em inglês
- **issuer**: Nome da instituição que emitiu em português
- **issuerEn**: Nome da instituição que emitiu em inglês
- **date**: Data de emissão em português (ex: "Janeiro 2024")
- **dateEn**: Data de emissão em inglês (ex: "January 2024")

**Campos Opcionais:**
- **credentialId**: ID da credencial para verificação (ou `null`)
- **credentialUrl**: Link para verificar/visualizar o certificado (ou `null`)
- **image**: Caminho da imagem do certificado (coloque em `public/certificates/`)
- **description**: Descrição detalhada em português (ou `null`)
- **descriptionEn**: Descrição detalhada em inglês (ou `null`)
- **ects**: Número de créditos ECTS (ou `null` se não aplicável)

## ➖ Remover um Certificado

1. Abra o arquivo `data/certificates.json`
2. Encontre o certificado que deseja remover
3. Delete todo o objeto (incluindo as chaves `{}` e a vírgula antes dele)
4. Certifique-se de que a vírgula está correta após o último certificado

## 🖼️ Adicionar Imagens de Certificados

1. Coloque suas imagens na pasta `public/certificates/`
2. Use o caminho `/certificates/nome-da-imagem.jpg` no JSON

**Exemplo:**
- Arquivo: `public/certificates/meu-certificado.jpg`
- No JSON: `"image": "/certificates/meu-certificado.jpg"`

## 💡 Dicas

- Mantenha os IDs sequenciais e únicos
- Se não tiver imagem, será exibido um ícone padrão
- O campo `ects` é opcional - use apenas se o certificado tiver créditos ECTS
- O `credentialId` é útil para certificados verificáveis online
- Você pode deixar `credentialUrl` como `null` se não tiver link de verificação

## 📋 Exemplo Completo

```json
[
  {
    "id": 1,
    "title": "Certificado em Machine Learning",
    "titleEn": "Machine Learning Certificate",
    "issuer": "Coursera",
    "issuerEn": "Coursera",
    "date": "Março 2024",
    "dateEn": "March 2024",
    "credentialId": "CERT-ABC123",
    "credentialUrl": "https://coursera.org/verify/ABC123",
    "image": "/certificates/ml-cert.jpg",
    "description": "Curso completo de Machine Learning cobrindo algoritmos supervisionados e não supervisionados.",
    "descriptionEn": "Complete Machine Learning course covering supervised and unsupervised algorithms.",
    "ects": 5
  },
  {
    "id": 2,
    "title": "Certificado em Python Avançado",
    "titleEn": "Advanced Python Certificate",
    "issuer": "Udemy",
    "issuerEn": "Udemy",
    "date": "Fevereiro 2024",
    "dateEn": "February 2024",
    "credentialId": null,
    "credentialUrl": "https://udemy.com/certificate/xyz",
    "image": null,
    "description": null,
    "descriptionEn": null,
    "ects": null
  }
]
```

## 🔄 Após Fazer Alterações

1. Salve o arquivo `data/certificates.json`
2. Se o servidor de desenvolvimento estiver rodando, ele atualizará automaticamente
3. Recarregue a página no navegador para ver as mudanças
