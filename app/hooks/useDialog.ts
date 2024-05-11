import { useState } from "react";

class Props {
    done?: (data?: any) => any;
    canceled?: (data?: any) => any;
} 

export function useDialog<TParams>(props: Props) {
    const [params, setParams] = useState<TParams>();
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = (params: TParams) => {
        setParams(params);
        setIsOpen(true);
    };
    const done = (data?: any) => {
        setIsOpen(false);
        if(props.done) props.done(data);
    };
    const canceled = () => {
        setIsOpen(false)
        if(props.canceled) props.canceled();
    };
    return {
        openDialog,
        params,
        isOpen,
        setIsOpen,
        done,
        canceled,
    }
}
