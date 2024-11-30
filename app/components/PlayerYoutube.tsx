import * as React from 'react';

import { css } from '@ocobo/styled-system/css';

const PlayerYoutube: React.FunctionComponent<{
  id: string;
  title?: string;
  className?: string;
}> = ({ id, title,  ...props }) => {
  return (
    <div {...props}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        title={title || 'Youtube Player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={css({ aspectRatio: '16 / 9', maxW: '100%' })}
      />
    </div>
  );
};

PlayerYoutube.displayName = 'PlayerYoutube';

export { PlayerYoutube };
