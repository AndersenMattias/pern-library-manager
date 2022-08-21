import create from 'zustand';

interface Employee {
  id: number;
  managerId: number;
  isCEO: string;
  isManager: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  salary: string;
  createdAt: string;
  updateAt: null;
}

interface ZustandStore {
  employees: Employee[];
  setEmployee: any;
  reset: any;
}

const initialState = {
  employees: [] as Employee[],
};

export const employeeStore = create<ZustandStore>((set, get) => ({
  ...initialState,
  setEmployee: (employees: Employee[]) =>
    set((state) => ({
      ...state,
      employees,
    })),
  reset: () => set(initialState),
}));
