# 🐍 AspisMed - Sistema de Gestão de Atendimentos Médicos  

![GitHub repo](https://img.shields.io/badge/Status-Em%20desenvolvimento-orange)  
![Tech](https://img.shields.io/badge/Tech-Spring%20%7C%20Next.js%20%7C%20MySql%20%7C%20Docker-blue)  

## 📌 Sobre o Projeto  
**AspisMed** é uma aplicação web para **gestão de atendimentos em consultórios de profissionais de saúde**. A plataforma permite que médicos, fisioterapeutas e outros profissionais organizem sua agenda, cadastrem pacientes, gerenciem atendimentos e acompanhem suas finanças de forma simples e eficiente.  

Este projeto foi desenvolvido como parte da **Atividade de Validação de Disciplina** da faculdade.  

## 🚀 Funcionalidades  

### 🔹 Perfil Administrador  
✅ Cadastro de usuários (Nome, CPF, WhatsApp, E-mail, Senha, Endereço Comercial)  
✅ Registro da data de cadastro dos usuários  

### 🔹 Perfil Usuário (Profissional de Saúde)  
✅ Login (E-mail e Senha)  
✅ Troca de senha no primeiro acesso  
✅ Atualização de perfil (Nome, CPF, WhatsApp, E-mail, Endereço)  

### 🔹 Gestão de Atendimentos  
✅ **Agenda Interativa** (usando FullCalendar) com exibição de atendimentos  
✅ Modal com detalhes dos atendimentos do dia  
✅ Cadastro de pacientes (Nome, CPF, Contato, Endereço, Observações)  
✅ Cadastro de atendimentos com informações como tipo, valor, status de pagamento e recorrência  

### 🔹 Gestão Financeira  
✅ Cadastro de tipos de atendimento (Descrição, Valor padrão, Duração padrão)  
✅ Cadastro de despesas (Descrição, Tipo, Valor, Data, Status de Pagamento)  
✅ Tela de **Finanças**, com filtro por período para visualizar **receitas e despesas**  

## 🛠 Tecnologias Utilizadas  
- **Spring Boot** (Backend)
- **Next.js** (Frontend)  
- **MySql** (Banco de Dados)  
- **FullCalendar** (Gerenciamento de Agenda)  
- **Docker** (Ambiente de Desenvolvimento)  

## 📂 Como Rodar o Projeto  

### **Pré-requisitos**  
Antes de iniciar, certifique-se de ter instalado:  
- Docker e Docker Compose

### **Passo a Passo**  

1️⃣ Clone o repositório:  
```bash
git clone https://github.com/seuusuario/aspismed.git
cd aspismed
docker-compose up
Acesse localhost no navegador :D
