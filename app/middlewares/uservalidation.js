import yup from 'yup';

const userSchema = yup.object({
  email: yup
    .string().email("Email inválido!")
    .required("Campo email é obrigatório!"),
  senha: yup
    .string()
    .min(6, "Senha muito fraca!")
    .required("Campo senha é obrigatório!"),
  recSenha: yup
    .string()
    .oneOf([yup.ref('senha'), null], "A reconfirmação da senha deve ser igual a senha"),
});

const userSchemaLogin = yup.object({
  email: yup
    .string().email("Email inválido!")
    .required("Campo email é obrigatório!"),
  senha: yup
    .string()
    .min(6, "Senha muito fraca!")
    .required("Campo senha é obrigatório!"),
});

export { userSchema, userSchemaLogin };