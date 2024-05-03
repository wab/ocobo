import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { css } from '@ocobo/styled-system/css';

import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Select } from './ui/Select';

const ContactForm: React.FunctionComponent<React.PropsWithChildren> = (
  props,
) => {
  const { t } = useTranslation(['contact']);

  return (
    <Form>
      <div
        className={css({
          mb: '6',
        })}
      >
        <Label htmlFor="email">{t('form.email', { ns: 'contact' })}*</Label>
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
        <Label htmlFor="job">{t('form.job', { ns: 'contact' })}*</Label>
        <Input id="job" name="job" required />
      </div>
      <div
        className={css({
          mb: '6',
        })}
      >
        <Label htmlFor="team">{t('form.team', { ns: 'contact' })}*</Label>
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
        <Label htmlFor="source">{t('form.source', { ns: 'contact' })}*</Label>
        <Input id="source" name="source" required />
      </div>
      {props.children}
      <div className={css({ textAlign: { base: 'center', lg: 'right' } })}>
        <Button
          type="submit"
          variant="outline"
          className={css({
            minWidth: { base: '2/3', lg: 'auto' },
          })}
        >
          {t('form.submit', { ns: 'contact' })}
        </Button>
      </div>
    </Form>
  );
};

export { ContactForm };
