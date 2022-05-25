import { createContext } from "react";

const PeopleDataContext = createContext();

export const PeopleDataProvider = PeopleDataContext.Provider;

export default PeopleDataContext;
