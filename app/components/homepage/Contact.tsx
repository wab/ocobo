import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css, cx } from '@ocobo/styled-system/css';
import { Grid, GridItem } from '@ocobo/styled-system/jsx';
import { container } from '@ocobo/styled-system/patterns';
import { section } from '@ocobo/styled-system/recipes';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Select } from '../ui/Select';

const Contact = () => {
  const { t } = useTranslation(['home', 'contact']);

  return (
    <section>
      <div
        className={cx(
          container({
            maxWidth: {
              base: 'full',
              lg: 'desktop',
              '2xl': 'xlarge',
            },
            px: { base: '0', lg: '8' },
          }),
        )}
      >
        <div
          className={css({
            bg: 'coral.light',
            borderTop: 'thin',
            borderColor: 'dark',
            px: { base: '1.5em', lg: 16 },
          })}
        >
          <Grid columns={{ base: 1, lg: 12 }} className={cx(section())}>
            <GridItem className={css({ hideBelow: 'xl' })} />
            <GridItem colSpan={{ base: 1, lg: 6, xl: 5 }}>
              <div
                className={css({
                  textAlign: { base: 'center', lg: 'left' },
                  maxWidth: { base: '4/5', lg: 'full' },
                  mx: 'auto',
                })}
              >
                <h2
                  className={css({
                    textStyle: 'heading1',
                    bleft: { base: 'none', lg: ' coral' },
                    mb: 6,
                  })}
                >
                  {t('contact.title')}
                </h2>
                <div className={css({ pr: { base: 0, lg: 12 } })}>
                  <p className={css({ textStyle: 'large' })}>
                    {t('contact.subtitle')}
                  </p>
                  <p className={css({ textStyle: 'medium' })}>
                    {t('contact.description')}
                  </p>
                </div>
              </div>
            </GridItem>

            <GridItem colSpan={{ base: 1, lg: 5, xl: 4 }}>
              <Form>
                <div
                  className={css({
                    mb: '6',
                  })}
                >
                  <Label htmlFor="email">
                    {t('form.email', { ns: 'contact' })}*
                  </Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div
                  className={css({
                    display: 'flex',
                    gap: '6',
                    mb: '6',
                  })}
                >
                  <div className={css({ w: '1/2' })}>
                    <Label htmlFor="firstname">
                      {t('form.firstname', { ns: 'contact' })}*
                    </Label>
                    <Input id="firstname" name="firstname" required />
                  </div>
                  <div className={css({ w: '1/2' })}>
                    <Label htmlFor="lastname">
                      {t('form.lastname', { ns: 'contact' })}*
                    </Label>
                    <Input id="lastname" name="lastname" required />
                  </div>
                </div>
                <div
                  className={css({
                    mb: '6',
                  })}
                >
                  <Label htmlFor="job">
                    {t('form.job', { ns: 'contact' })}*
                  </Label>
                  <Input id="job" name="job" required />
                </div>
                <div
                  className={css({
                    mb: '6',
                  })}
                >
                  <Label htmlFor="team">
                    {t('form.team', { ns: 'contact' })}*
                  </Label>
                  <Select.Root name="team" defaultValue="1" required>
                    <Select.Trigger id="team">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="1">1-10</Select.Item>
                        <Select.Item value="11">11-50</Select.Item>
                        <Select.Item value="50">50+</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </div>
                <div
                  className={css({
                    mb: '6',
                  })}
                >
                  <Label htmlFor="source">
                    {t('form.source', { ns: 'contact' })}*
                  </Label>
                  <Input id="source" name="source" required />
                </div>
                <div className={css({ textAlign: 'right' })}>
                  <Button type="submit" variant="outline">
                    {t('form.submit', { ns: 'contact' })}
                  </Button>
                </div>
              </Form>
            </GridItem>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export { Contact };
