import * as React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

const Cloudata = ({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M61 54h-1V18a4 4 0 0 0-4-4c-10 0-6 0-9-1a6 6 0 0 0-6-5 11 11 0 0 0-21 2 8 8 0 0 0-6 4H8a4 4 0 0 0-4 4v36H3a3 3 0 0 0-3 3v2a5 5 0 0 0 5 5h54a5 5 0 0 0 5-5v-2a3 3 0 0 0-3-3Zm-7-34v30H10V20h3a8 8 0 0 0 8 6h5v9H16a1 1 0 0 0-1 1v5a3 3 0 1 0 2 0v-4h10a1 1 0 0 0 1-1V26h3v15a3 3 0 1 0 2 0V26h3v10a1 1 0 0 0 1 1h10v4a3 3 0 1 0 2 0v-5a1 1 0 0 0-1-1H38v-9h7a7 7 0 0 0 6-6ZM16 43a1 1 0 0 1 0 2 1 1 0 0 1 0-2Zm16 0a1 1 0 0 1 0 2 1 1 0 0 1 0-2Zm16 0a1 1 0 0 1 0 2 1 1 0 0 1 0-2ZM21 12a1 1 0 0 0 1-1 9 9 0 0 1 17-2 1 1 0 0 0 1 1 4 4 0 0 1 5 4 1 1 0 0 0 1 1c5 1 4 9-1 9H21a6 6 0 0 1 0-12ZM6 18a2 2 0 0 1 2-2h5a8 8 0 0 0 0 2H9a1 1 0 0 0-1 1v32a1 1 0 0 0 1 1h46a1 1 0 0 0 1-1V19a1 1 0 0 0-1-1h-4a7 7 0 0 0-1-2h6a2 2 0 0 1 2 2v36H6Zm34 38-1 1H25l-1-1Zm22 3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1h18l2 3h17l3-3h18a1 1 0 0 1 1 1Z" />
  </svg>
);

const Mrr = ({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m55 10 3-3-7-1a32 32 0 0 0-41 3L8 7a1 1 0 0 0-2 0v6a32 32 0 0 0 3 41l-3 3 7 1a32 32 0 0 0 41-3l3 3a1 1 0 0 0 1-1v-6a32 32 0 0 0-3-41Zm-2-1a1 1 0 0 0 0 2 30 30 0 0 1 5 36 1 1 0 0 0-1-1h-3a26 26 0 0 0-4-32 1 1 0 0 0-1 0l-1 1V8h6Zm-6 37a1 1 0 0 0-1 2l2 2a24 24 0 0 1-30 2v-6l-4 2a24 24 0 0 1-2-30h5a1 1 0 0 0 1-2l-2-2a24 24 0 0 1 30-2v6l4-2a24 24 0 0 1 2 30ZM8 10l2 1a1 1 0 0 0 1 0 30 30 0 0 1 36-5 1 1 0 0 0-1 1v3a26 26 0 0 0-32 4l1 2H8Zm3 45a1 1 0 0 0 0-2 30 30 0 0 1-5-36 1 1 0 0 0 1 1h3a26 26 0 0 0 4 32 1 1 0 0 0 0 1l2-2v7h-6Zm45-1-1-1a1 1 0 0 0-2 0 30 30 0 0 1-36 5 1 1 0 0 0 1-1v-3a26 26 0 0 0 32-4c1-1 0-1-1-2h7Z" />
    <path d="M32 21a11 11 0 1 0 11 11 11 11 0 0 0-11-11Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" />
    <path d="M31 29h4a1 1 0 0 0 0-2h-2v-1a1 1 0 0 0-2 0v1a3 3 0 0 0 0 6h2a1 1 0 0 1 0 2h-4a1 1 0 0 0 0 2h2v1a1 1 0 0 0 2 0v-1a3 3 0 0 0 0-6h-2a1 1 0 0 1 0-2Z" />
    <path d="m48 36-1-1a14 14 0 0 0 0-6l1-1a1 1 0 0 0 1-1l-4-7a1 1 0 0 0-2 0l-1 1a15 15 0 0 0-5-3v-2a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v2a15 15 0 0 0-5 3l-1-1a1 1 0 0 0-2 0c-5 9-5 7-2 9a14 14 0 0 0 0 6l-2 1 4 8a1 1 0 0 0 2 0l1-1a15 15 0 0 0 5 3v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2a15 15 0 0 0 5-3l1 1a1 1 0 0 0 2 0l4-7a1 1 0 0 0-1-1Zm-3-7a13 13 0 0 1 0 6c-1 1 0 1 1 2l-3 5-1-1-6 3-1 3h-6v-2c0-1-2 0-6-4l-2 1-3-5c3-2 1-1 1-5s2-3-1-5l3-5 1 1a1 1 0 0 0 1 0c4-4 6-3 6-4v-2h6l1 3 6 3 1-1 3 5c-1 1-2 1-1 2Z" />
  </svg>
);

const DataAnalitycs = ({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M61 54h-1V18a4 4 0 0 0-4-4h-5V1a1 1 0 0 0-1-1H14a1 1 0 0 0-1 1v13H8a4 4 0 0 0-4 4v36H3a3 3 0 0 0-3 3v2a5 5 0 0 0 5 5h54a5 5 0 0 0 5-5v-2a3 3 0 0 0-3-3Zm-51-4V20h3v30Zm5-42h34v42H15Zm36 12h3v30h-3ZM15 2h34v4H15ZM6 18a2 2 0 0 1 2-2h5v2H9a1 1 0 0 0-1 1v32a1 1 0 0 0 1 1h46a1 1 0 0 0 1-1V19a1 1 0 0 0-1-1h-4v-2h5a2 2 0 0 1 2 2v36H6Zm34 38-1 1H25l-1-1Zm22 3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2a1 1 0 0 1 1-1h18l2 3h17l3-3h18a1 1 0 0 1 1 1Z" />
    <path d="M18 3a1 1 0 0 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2Zm4 0a1 1 0 0 0 0 2 1 1 0 0 0 0-2Zm18 28h-3V21a1 1 0 0 0-2 0v10h-3v-5a1 1 0 0 0-2 0v5h-3v-8a1 1 0 0 0-2 0v8h-3v-3a1 1 0 0 0-2 0v3h-3v-4l9-9 3 4a1 1 0 0 0 2 0l7-8v2a1 1 0 0 0 2 0c0-6 1-5-5-5a1 1 0 0 0 0 2h2l-7 7-3-4a1 1 0 0 0-2 0l-8 9V12a1 1 0 0 0-2 0v20a1 1 0 0 0 1 1h24a1 1 0 0 0 0-2Zm0 6H24a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2Zm0 4H24a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2Zm0 4H24a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2Zm-24-8a1 1 0 0 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 0 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 0 0 0 2 1 1 0 0 0 0-2Z" />
  </svg>
);

const Target = ({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M61 29h-1A28 28 0 0 0 35 4V3a3 3 0 0 0-6 0v1A28 28 0 0 0 4 29H3a3 3 0 0 0 0 6h1a28 28 0 0 0 25 25v1a3 3 0 0 0 6 0v-1a28 28 0 0 0 25-25h1a3 3 0 0 0 0-6Zm-3 0h-2A24 24 0 0 0 35 8V6a26 26 0 0 1 23 23Zm-5 6h1a22 22 0 0 1-19 19v-1a3 3 0 0 0-6 0v1a22 22 0 0 1-19-19h1a3 3 0 0 0 0-6h-1a22 22 0 0 1 19-19v1a3 3 0 0 0 6 0v-1a22 22 0 0 1 19 19h-1a3 3 0 0 0 0 6ZM31 3a1 1 0 0 1 2 0v8a1 1 0 0 1-2 0Zm-2 3v2A24 24 0 0 0 8 29H6A26 26 0 0 1 29 6ZM3 31h8a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Zm3 4h2a24 24 0 0 0 21 21v2A26 26 0 0 1 6 35Zm27 26a1 1 0 0 1-2 0v-8a1 1 0 0 1 2 0Zm2-3v-2a24 24 0 0 0 21-21h2a26 26 0 0 1-23 23Zm26-25h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Z" />
    <path d="M32 21a11 11 0 1 0 11 11 11 11 0 0 0-11-11Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" />
    <path d="M31 29h4a1 1 0 0 0 0-2h-2v-1a1 1 0 0 0-2 0v1a3 3 0 0 0 0 6h2a1 1 0 0 1 0 2h-4a1 1 0 0 0 0 2h2v1a1 1 0 0 0 2 0v-1a3 3 0 0 0 0-6h-2a1 1 0 0 1 0-2Z" />
    <path d="M45 20a1 1 0 0 0-2 0l-1 1a15 15 0 0 0-5-3v-2a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v2a15 15 0 0 0-5 3l-1-1a1 1 0 0 0-2 0l-4 7a1 1 0 0 0 1 1l1 1a14 14 0 0 0 0 6l-1 1a1 1 0 0 0-1 1l4 7a1 1 0 0 0 2 0l1-1a15 15 0 0 0 5 3v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2a15 15 0 0 0 5-3l1 1a1 1 0 0 0 2 0c5-9 5-7 2-9a14 14 0 0 0 0-6c3-2 3 0-2-9Zm0 9a13 13 0 0 1 0 6c-1 1 0 1 1 2l-3 5-1-1-6 3-1 3h-6v-2c0-1-2 0-6-4l-2 1-3-5c3-2 1-1 1-5s2-3-1-5l3-5 1 1a1 1 0 0 0 1 0c4-4 6-3 6-4v-2h6l1 3 6 3 1-1 3 5c-1 1-2 1-1 2Z" />
  </svg>
);

const Direction = ({ title, titleId, ...props }: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m63 41-5-3a27 27 0 0 0 0-12l5-3a1 1 0 0 0 0-1l-7-12s-1-1-6 2a27 27 0 0 0-10-6V1a1 1 0 0 0-1-1H25a1 1 0 0 0-1 1v5a27 27 0 0 0-10 6l-5-2a1 1 0 0 0-1 0L1 23l5 3a27 27 0 0 0 0 12l-5 3 7 13a1 1 0 0 0 1 0l5-2a27 27 0 0 0 10 6v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5a27 27 0 0 0 10-6c5 3 5 3 6 2l7-12a1 1 0 0 0 0-1Zm-8 11-4-2a1 1 0 0 0-1 0 25 25 0 0 1-11 6 1 1 0 0 0-1 1v5H26v-5a1 1 0 0 0-1-1 25 25 0 0 1-10-6 1 1 0 0 0-2 0l-4 2-6-10 4-3a1 1 0 0 0 1-1 25 25 0 0 1 0-12 1 1 0 0 0-1-1l-4-3 6-10 4 2a1 1 0 0 0 2 0 25 25 0 0 1 10-6 1 1 0 0 0 1-1V2h12v5a1 1 0 0 0 1 1 25 25 0 0 1 10 6 1 1 0 0 0 2 0l4-2 6 10c-7 4-4 1-4 10s-3 6 4 10Z" />
    <path d="M46 18a20 20 0 1 0 0 28 20 20 0 0 0 0-28Zm1 15h3a18 18 0 0 1-5 11v-1a1 1 0 0 0-2 2h1a18 18 0 0 1-11 5v-3a1 1 0 0 0-2 0v3a18 18 0 0 1-11-5h1a1 1 0 0 0-2-2v1a18 18 0 0 1-5-11h3a1 1 0 0 0 0-2h-3a18 18 0 0 1 5-11l1 1a1 1 0 0 0 1-2h-1a18 18 0 0 1 11-5v3a1 1 0 0 0 2 0v-3a18 18 0 0 1 11 5h-1a1 1 0 0 0 1 2l1-1a18 18 0 0 1 5 11h-3a1 1 0 0 0 0 2Z" />
    <path d="m36 29-12-6a1 1 0 0 0-1 1l6 12 11 5a1 1 0 0 0 1-1Zm-3 0-4 4-3-7Zm-2 6 4-4 3 7Z" />
  </svg>
);

export const Icons = { Cloudata, Mrr, DataAnalitycs, Target, Direction };
