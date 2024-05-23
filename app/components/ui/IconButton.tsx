import { HTMLStyledProps, styled } from '@ocobo/styled-system/jsx';
import { iconButton } from '@ocobo/styled-system/recipes';

import { BaseButton } from './Button';

const IconButton = styled(BaseButton, iconButton);
type IconButtonProps = HTMLStyledProps<typeof IconButton>;

export { IconButton };
export type { IconButtonProps };
