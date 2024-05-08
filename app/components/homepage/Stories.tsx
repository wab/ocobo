import { css } from '@ocobo/styled-system/css';

import { Container } from '../ui/Container';

const Stories = () => {
  return (
    <section
      className={css({
        hideBelow: 'lg',
        position: 'relative',

        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '50%',
          bg: 'dark',
        },
      })}
    >
      <Container>
        <div
          className={css({
            bg: 'mint.light',
            py: '8',
            px: '4rem',
            borderTop: 'thick',
            borderColor: 'mint',
            width: '4/6',
            mx: 'auto',
          })}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod
          nobis molestias facere itaque, explicabo tempore optio, excepturi ab
          quo expedita at. Dicta, minima minus autem saepe ut nam dolorum!
        </div>
      </Container>
    </section>
  );
};

export { Stories };
