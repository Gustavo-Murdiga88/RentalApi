# Cadastro de carro
**RF**
  - Deve ser possível cadastrar um novo carro
  - Deve ser possível listar todas as categorias

**RN**
  - Não deve ser possível cadastrar um carro com uma placa já existente.
  <!-- - Não deve ser possível alterar a placa de um carro já cadastrado. -->
  - O carro deve ser cadastrado, por padrão, com disponibilidade.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**

  - Deve ser possível listar todos os carros disponíveis
  - Deve ser possível listar todos os carros disponíveis pelo nome da categoria
  - Deve ser possível listar todos os carros

# Cadastro de Especificação no carro
**RF**

  - Deve ser possível cadastrar uma especificação para um carro

**RN**

  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
  - Não deve ser possível cadastrar uma especificação já existente para O mesmo carro.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**

  - Deve ser possível cadastrar a imagem do carro

**RNF**

  - Utilizar multer para upload dos arquivos

**RN**

  - usuário deve poder cadastrar mais de uma imagem para O mesmo carro
  - O usuário responsável pelo cadastro deve ser um usuário administrador.

# Alugel de carro

**RF**
  - Deve ser possível cadastrar um aluguel

**RN**
  - O aluguel deve ter duração mínima de 24 horas.
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
  - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro


# Devolução do carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, devera ser cobrado diária completa.
Ao realizar a devolução, o carro devera ser liberado para outro aluguel.
Ao realizar a devolução, o usuário devera ser Liberado para outro aluguel.
Ao realizar a devolução, devera ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, devera ser cobrado multa proporcional aos dias de atraso.


## Listagem de Alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
O usuário deve estar logado na aplicação


# Recuperar senha

**RF**

O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
O usuário deve conseguir inserir uma nova senha
O usuário deve conseguir inserir uma nova senha

 **RN**
- O usuario precisa informar uma nova senha
- O link enviado para a er 1 deve expirar em 3 horas