import React from 'react';

type FunctionComponentWithChildrenAndClassName = React.FunctionComponent<
  React.PropsWithChildren<{ className?: string }>
>;

export const Container: FunctionComponentWithChildrenAndClassName = (props) => {
  return <div className="container mx-auto px-4">{props.children}</div>;
};
