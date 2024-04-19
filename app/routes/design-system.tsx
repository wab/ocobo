import type { MetaFunction } from '@remix-run/node';
import { Check, ChevronRight, Menu, X } from 'lucide-react';

import { css, cx } from '@ocobo/styled-system/css';
import { styled } from '@ocobo/styled-system/jsx';
import { container, grid, hstack, vstack } from '@ocobo/styled-system/patterns';
import { icon, typography } from '@ocobo/styled-system/recipes';

import { Button } from '~/components/ui/Button';
import { Callout } from '~/components/ui/Callout';
import { Illustration } from '~/components/ui/Illustration';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import { Link } from '~/components/ui/Link';
import { Logocobo } from '~/components/ui/Logocobo';
import { Select } from '~/components/ui/Select';

export const meta: MetaFunction = () => {
  return [
    { title: 'Ocobo • design system' },
    {
      name: 'description',
      content:
        "le design syste d'Ocobo est un ensemble de composants réutilisables, guidés par des principes de design, qui peuvent être assemblés pour construire n'importe quel nombre d'applications.",
    },
  ];
};

const Section = styled('section', {
  base: {
    py: '8',
    mt: '4',
    borderTop: 'thin',
    borderColor: 'gray.light',
  },
});

const sectionTitle = cx(typography({ variant: 'heading2' }), css({ mb: '4' }));

const ColorBox = styled('div', {
  base: {
    display: 'inline-block',
    width: '[60px]',
    height: '[60px]',
    borderRadius: 'full',
    border: 'thin',
    borderColor: 'gray.light',
  },
});

const list = css({
  display: 'grid',
  gridTemplateColumns: '[repeat(8, 90px)]',
  alignItems: 'start',
  justifyItems: 'center',
  gap: '4',
  py: '4',
  '& li': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2',
  },
});

const colorTitle = css({
  fontSize: 'md',
  fontWeight: 'normal',
  color: 'dark',
  textAlign: 'center',
});

const fontTitle = css({
  display: 'block',
  color: 'gray',
  padding: '[16px 0 4px 0]',
});

export default function Index() {
  return (
    <div className={container()}>
      <header
        className={css({
          marginBottom: '8',
        })}
      >
        <h1 className={typography({ variant: 'heading1' })}>Design System</h1>
      </header>
      <Section>
        <h2 className={sectionTitle}>Logo</h2>
        <Logocobo width="300" />
      </Section>
      <Section>
        <h2 className={sectionTitle}>Typography</h2>
        <ul className={css({ maxWidth: 'prose' })}>
          <li>
            <span className={fontTitle}>heading1</span>
            <p className={typography({ variant: 'heading1' })}>
              RevOps pour Entreprises Modernes
            </p>
          </li>
          <li>
            <span className={fontTitle}>heading2</span>
            <p className={sectionTitle}>RevOps pour Entreprises Modernes</p>
          </li>
          <li>
            <span className={fontTitle}>heading3</span>
            <p className={typography({ variant: 'heading3' })}>
              Agence leader en revenue operations et stratégies revenus b2b &
              b2c
            </p>
          </li>
          <li>
            <span className={fontTitle}>large</span>
            <p className={typography({ variant: 'large' })}>
              Nous vous aidons à transformer l’organisation et les processus de
              vos équipes Revenues pour leur permettre d’être plus performantes
              et d’atteindre vos objectifs de croissance et de rentabilité.
            </p>
          </li>
          <li>
            <span className={fontTitle}>medium</span>
            <p className={typography()}>
              Nous vous aidons à transformer l’organisation et les processus de
              vos équipes Revenues pour leur permettre d’être plus performantes
              et d’atteindre vos objectifs de croissance et de rentabilité.
            </p>
          </li>
          <li>
            <span className={fontTitle}>small</span>
            <p className={typography({ variant: 'small' })}>
              Nous vous aidons à transformer l’organisation et les processus de
              vos équipes Revenues pour leur permettre d’être plus performantes
              et d’atteindre vos objectifs de croissance et de rentabilité.
            </p>
          </li>
          <li>
            <span className={fontTitle}>nav</span>
            <p className={typography({ variant: 'nav' })}>navigation item</p>
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Colors</h2>
        <ul className={list}>
          <li>
            <ColorBox css={{ backgroundColor: 'dark' }} />
            <p className={colorTitle}>Dark</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'white' }} />
            <p className={colorTitle}>White</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'gray' }} />
            <p className={colorTitle}>Gray</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'gray.light' }} />
            <p className={colorTitle}>Gray light</p>
          </li>
        </ul>
        <ul className={list}>
          <li>
            <ColorBox css={{ backgroundColor: 'yellow' }} />
            <p className={colorTitle}>Yellow</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'mint' }} />
            <p className={colorTitle}>Mint</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'sky' }} />
            <p className={colorTitle}>Sky</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'coral' }} />
            <p className={colorTitle}>Coral</p>
          </li>
        </ul>
        <ul className={list}>
          <li>
            <ColorBox css={{ backgroundColor: 'yellow.light' }} />
            <p className={colorTitle}>Yellow light</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'mint.light' }} />
            <p className={colorTitle}>Mint light</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'sky.light' }} />
            <p className={colorTitle}>Sky light</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'coral.light' }} />
            <p className={colorTitle}>Coral light</p>
          </li>
        </ul>
        <ul className={list}>
          <li>
            <ColorBox css={{ backgroundColor: 'yellow.dark' }} />
            <p className={colorTitle}>Yellow dark</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'mint.dark' }} />
            <p className={colorTitle}>Mint dark</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'sky.dark' }} />
            <p className={colorTitle}>Sky dark</p>
          </li>
          <li>
            <ColorBox css={{ backgroundColor: 'coral.dark' }} />
            <p className={colorTitle}>Coral dark</p>
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Buttons & links</h2>
        <ul
          className={css({
            display: 'flex',
            gap: '4',
            p: '4',
          })}
        >
          <li
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '2',
            })}
          >
            <Button variant="outline">outline</Button>
            <Button variant="outline" disabled>
              disabled
            </Button>
          </li>
          <li
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '2',
            })}
          >
            <Button variant="solid">solid</Button>
            <Button variant="solid" disabled>
              disabled
            </Button>
          </li>
        </ul>
        <ul
          className={cx(
            'dark',
            css({
              backgroundColor: 'background',
              display: 'flex',
              gap: '4',
              p: '4',
            }),
          )}
        >
          <li
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '2',
            })}
          >
            <Button variant="outline">outline</Button>
            <Button variant="outline" disabled>
              disabled
            </Button>
          </li>
          <li
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '2',
            })}
          >
            <Button variant="solid">solid</Button>
            <Button variant="solid" disabled>
              disabled
            </Button>
          </li>
        </ul>
        <ul
          className={css({
            display: 'flex',
            gap: '4',
            p: '4',
          })}
        >
          <li
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '2',
            })}
          >
            <Link href="#">En savoir plus</Link>
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Borders</h2>
        <ul className={grid({ columns: 4, gap: '6' })}>
          <li className={css({ bleft: 'yellow' })}>
            Gagnez en performance avec des stratégies et des process de pointe
          </li>
          <li className={css({ bleft: 'sky' })}>
            Gagnez en performance avec des stratégies et des process de pointe
          </li>
          <li className={css({ bleft: 'mint' })}>
            Gagnez en performance avec des stratégies et des process de pointe
          </li>
          <li className={css({ bleft: ' coral' })}>
            Gagnez en performance avec des stratégies et des process de pointe
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Callout</h2>
        <ul className={grid({ columns: 2, gap: '10', maxWidth: '[1200px]' })}>
          <li>
            <Callout title="Stratégies Revenue Operations">
              <p className={typography({ variant: 'large' })}>
                Nos experts en stratégies Revenue vous fournissent un plan
                d’actions RevOps, comprennent vos équipes et vos processus,
                optimisent la data, et brisent les silos.
              </p>
              <p>
                Analyses du funnel et mapping du customer journey. Organisation
                d’équipes. Forecasting & budgets. Segmentation. Territory
                Planning.
              </p>
              <p>
                <Link href="#">En savoir plus</Link>
              </p>
            </Callout>
          </li>
          <li>
            <Callout variant="sky" title="Stratégies Revenue Operations">
              <p className={typography({ variant: 'large' })}>
                Nos experts en stratégies Revenue vous fournissent un plan
                d’actions RevOps, comprennent vos équipes et vos processus,
                optimisent la data, et brisent les silos.
              </p>
              <p>
                Analyses du funnel et mapping du customer journey. Organisation
                d’équipes. Forecasting & budgets. Segmentation. Territory
                Planning.
              </p>
              <p>
                <Link href="#">En savoir plus</Link>
              </p>
            </Callout>
          </li>
          <li>
            <Callout variant="mint" title="Stratégies Revenue Operations">
              <p className={typography({ variant: 'large' })}>
                Nos experts en stratégies Revenue vous fournissent un plan
                d’actions RevOps, comprennent vos équipes et vos processus,
                optimisent la data, et brisent les silos.
              </p>
              <p>
                Analyses du funnel et mapping du customer journey. Organisation
                d’équipes. Forecasting & budgets. Segmentation. Territory
                Planning.
              </p>
              <p>
                <Link href="#">En savoir plus</Link>
              </p>
            </Callout>
          </li>
          <li>
            <Callout variant="coral" title="Stratégies Revenue Operations">
              <p className={typography({ variant: 'large' })}>
                Nos experts en stratégies Revenue vous fournissent un plan
                d’actions RevOps, comprennent vos équipes et vos processus,
                optimisent la data, et brisent les silos.
              </p>
              <p>
                Analyses du funnel et mapping du customer journey. Organisation
                d’équipes. Forecasting & budgets. Segmentation. Territory
                Planning.
              </p>
              <p>
                <Link href="#">En savoir plus</Link>
              </p>
            </Callout>
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Form</h2>
        <form
          className={vstack({
            alignItems: 'start',
            bg: 'coral.light',
            p: '8',
          })}
        >
          <div
            className={css({
              width: 'md',
            })}
          >
            <Label htmlFor="email" className={css({})}>
              E-mail professionnel*
            </Label>
            <Input id="email" name="email" placeholder="nom@email.com" />
          </div>

          <div
            className={css({
              width: 'md',
            })}
          >
            <Label htmlFor="email_disabled" className={css({})}>
              E-mail professionnel*
            </Label>
            <Input
              disabled
              id="email_disabled"
              name="email_disabled"
              placeholder="nom@email.com"
            />
          </div>
          <div
            className={css({
              width: 'md',
            })}
          >
            <Label htmlFor="email_error" className={css({})}>
              E-mail professionnel*
            </Label>
            <Input
              isError
              id="email_error"
              name="email_error"
              placeholder="nom@email.com"
            />
          </div>
          <div
            className={css({
              width: 'md',
            })}
          >
            <Label htmlFor="email_error" className={css({})}>
              Select
            </Label>
            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Select a fruit" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Fruits</Select.Label>
                  <Select.Item value="apple">Apple</Select.Item>
                  <Select.Item value="banana">Banana</Select.Item>
                  <Select.Item value="blueberry">Blueberry</Select.Item>
                  <Select.Item value="grapes">Grapes</Select.Item>
                  <Select.Item value="pineapple">Pineapple</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>
        </form>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Icons</h2>
        <ul className={hstack()}>
          <li>
            <Menu className={icon({ size: 'lg' })} />
          </li>
          <li>
            <X className={icon({ size: 'lg' })} />
          </li>
          <li>
            <ChevronRight className={icon({ size: 'lg' })} />
          </li>
          <li className={css({ color: 'mint' })}>
            <Check className={icon({ size: 'lg' })} />
          </li>
          <li className={css({ color: 'coral' })}>
            <X className={icon({ size: 'lg' })} />
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Illustrations</h2>
        <ul className={grid({ columns: 4, alignItems: 'center' })}>
          <li>
            <Illustration name="homepage_hero" />
          </li>
          <li>
            <Illustration name="homepage_faster" />
          </li>
          <li>
            <Illustration name="homepage_remarkable" />
          </li>
          <li>
            <Illustration name="strategy_hero" />
          </li>
        </ul>
      </Section>
      <Section>
        <h2 className={sectionTitle}>Grid</h2>
        <ul
          className={grid({
            columns: 12,
            '& > li': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'gray.light',
              minHeight: '[200px]',
            },
          })}
        >
          <li>col 1</li>
          <li>col 2</li>
          <li>col 3</li>
          <li>col 4</li>
          <li>col 5</li>
          <li>col 6</li>
          <li>col 7</li>
          <li>col 8</li>
          <li>col 9</li>
          <li>col 10</li>
          <li>col 11</li>
          <li>col 12</li>
        </ul>
      </Section>
    </div>
  );
}
