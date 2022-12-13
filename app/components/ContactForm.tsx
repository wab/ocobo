import { Field } from './Field';

export const ContactForm = () => {
  return (
    <form>
      <Field.Root>
        <Field.Label htmlFor="email">Votre email</Field.Label>
        <Field.Input type="email" id="email" name="email" />
      </Field.Root>
      <Field.Root>
        <Field.Label htmlFor="message">Votre message</Field.Label>
        <Field.Textarea id="message" name="message" />
      </Field.Root>
    </form>
  );
};
