import { createContext } from "react";

const defaultContext = {
    user: null,
    setUser: () => {},
    metrics: null,
    setMetrics: () => {},
    groups: null,
    setGroups: () => {}
};

export const AppContext = createContext(defaultContext);