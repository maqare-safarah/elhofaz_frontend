import { useCallback, useState } from "react";

export const useRefresh = () : [number, () => void]=> {
    const [refreshCount, setRefreshCount] = useState(0)
    const doRefresh = useCallback(() => {
        setRefreshCount(refreshCount + 1)
    }, [refreshCount]);
    return [refreshCount, doRefresh];
}
