import { IToastMessage } from "./types";

export const MessageToast = ({message}: IToastMessage) => {
    return (
        <h4 className=''>{message}</h4>
    );
};