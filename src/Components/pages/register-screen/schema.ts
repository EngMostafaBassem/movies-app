import * as yup from 'yup'
export const schema = yup.object().shape({
    name:yup.string().required(),
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.').label('Password')
  });
  