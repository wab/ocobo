import { styled } from '@ocobo/styled-system/jsx';

const Wrapper = styled('div', {
  base: {
    '& input': {
      width: 'full',
      height: 'input',
      px: '2',
      border: 'thin',
      borderColor: 'white',
      backgroundColor: 'white',

      _placeholder: { color: 'gray' },

      _focusVisible: {
        outline: 'none',
        borderColor: 'gray',
      },

      _disabled: {
        pointerEvents: 'none',
        bg: 'gray.light',
        borderColor: 'gray.light',
        color: 'gray',
        cursor: 'not-allowed',
      },
    },
  },
});

const HubspotFormWrapper: React.FunctionComponent<
  React.ComponentProps<typeof Wrapper>
> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

HubspotFormWrapper.displayName = 'HubspotFormWrapper';

export { HubspotFormWrapper };
