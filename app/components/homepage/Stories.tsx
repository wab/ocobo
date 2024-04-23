import { css, cx } from '@ocobo/styled-system/css';
import { container } from '@ocobo/styled-system/patterns';

const PADDING = '3rem';
const MARGIN = '110px';

const Stories = () => {
  return (
    <section>
      <div
        className={css({
          bg: 'dark',
          color: 'white',
          pt: { base: 6, lg: PADDING },
          pb: { base: 6, lg: `calc(${PADDING} + ${MARGIN})` },
          textAlign: 'center',
        })}
      >
        <p
          className={cx(
            container({ maxWidth: '70%' }),
            css({
              textStyle: 'heading2',
              pb: { base: 6, lg: `calc(${PADDING} / 2)` },
            }),
          )}
        >
          Favoris des leaders actuels et futurs
        </p>
        <div>défilement des logos clients</div>
      </div>
      <div
        className={cx(
          container({ maxWidth: '4xl' }),
          css({
            hideBelow: 'lg',
            bg: 'mint.light',
            py: '8',
            borderTop: 'thick',
            borderColor: 'mint',
            mt: `-${MARGIN}`,
          }),
        )}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod
        nobis molestias facere itaque, explicabo tempore optio, excepturi ab quo
        expedita at. Dicta, minima minus autem saepe ut nam dolorum!
      </div>
    </section>
  );
};

export { Stories };
