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
  employee: Employee[];
  setEmployee: any;
  reset: () => void;
}

const initialState = {
  employee: [] as Employee[],
};

export const employeeStore = create<ZustandStore>((set, get) => ({
  ...initialState,

  setEmployee: (employee: Employee[]) =>
    set((state) => ({
      ...state,
      employee,
    })),
  reset: () => set(initialState),
}));
