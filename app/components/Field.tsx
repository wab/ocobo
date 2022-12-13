import React from 'react';

const Root: React.FunctionComponent<React.PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div className="pb-8 " {...props}>
      {children}
    </div>
  );
};
type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label: React.FunctionComponent<React.PropsWithChildren<LabelProps>> = ({
  children,
  ...props
}) => {
  return (
    <label className="mb-2 block font-light" {...props}>
      {children}
    </label>
  );
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FunctionComponent<InputProps> = (props) => {
  return (
    <input
      className="h-10 min-w-full rounded-md border-2 border-light bg-white px-4 text-dark"
      {...props}
    />
  );
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea: React.FunctionComponent<TextareaProps> = (props) => {
  return (
    <textarea
      className="min-w-full rounded-md border-2 border-light bg-white p-4 text-dark"
      {...props}
      rows={10}
    />
  );
};

export const Field = { Root, Label, Input, Textarea };
