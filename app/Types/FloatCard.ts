import { MouseEventHandler } from "react";

export interface FloatCardProps{
    cardType?: string;
    haveLayout?: string;
    noBorder?: boolean;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode | React.ReactNode[];
}