import * as yup from 'yup'
export const schema = yup.object().shape({
    title: yup.string().required().label('Title'),
    genre: yup.string().required().label('Genre'),
    numberInStock: yup.number().integer().positive().required().label('Number in Stock'),
    dailyRentalRate: yup.number().min(0).max(10).required().label('Rate'),
  });
  