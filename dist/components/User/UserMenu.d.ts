import { UserMenuProps as BaseUserMenuProps, UserMenuI18N } from 'decentraland-ui/dist/components/UserMenu/UserMenu';
import './UserMenu.css';
export declare type UserMenuProps = Pick<BaseUserMenuProps, 'menuItems' | 'hasActivity' | 'onClickProfile' | 'onClickActivity' | 'onClickSettings'> & {
    i18n?: Partial<UserMenuI18N>;
    hideBalance?: boolean;
};
export default function UserMenu(props: UserMenuProps): JSX.Element;
