import { object, string, number, date, InferType } from 'yup';
export const userSchema = object({
    firstName: string().required("First name is required!"),
    lastName: string().required("Last name is required!"),
    bio: string(),
    createdOn: date().default(() => new Date()),
});