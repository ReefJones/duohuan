import { MouseEventHandler } from "react";

export interface MenuButtonListProps{
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode | React.ReactNode[];
}