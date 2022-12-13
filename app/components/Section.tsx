import React from 'react';

type FunctionComponentWithChildrenAndClassName = React.FunctionComponent<
  React.PropsWithChildren<{ className?: string }>
>;

const Root: FunctionComponentWithChildrenAndClassName = (props) => {
  return <section className={`pt-12 ${props.className}`}>{props.children}</section>;
};

const Container: FunctionComponentWithChildrenAndClassName = (props) => {
  return <div className={`container mx-auto px-4 ${props.className}`}>{props.children}</div>;
};
const Grid: React.FunctionComponent<
  React.PropsWithChildren<{ className?: string; hasBorder?: boolean }>
> = (props) => {
  return (
    <div
      className={`dektop:min-h-[40vh] flex grid-cols-12 flex-col items-center gap-4 py-12 desktop:grid ${
        props.className
      } ${props.hasBorder ? 'border-b-2 border-light border-opacity-50' : ''}`}
    >
      {props.children}
    </div>
  );
};

const Title: FunctionComponentWithChildrenAndClassName = (props) => {
  return (
    <h2
      className={`text-current mb-6 font-title text-2xl leading-normal desktop:text-4xl ${props.className}`}
    >
      <span>{props.children}</span>
    </h2>
  );
};

const SubTitle: FunctionComponentWithChildrenAndClassName = (props) => {
  return (
    <h3
      className={`text-current mb-6 font-title text-xl leading-normal desktop:text-3xl ${props.className}`}
    >
      {props.children}
    </h3>
  );
};

export const Section = { Root, Container, Grid, Title, SubTitle };
