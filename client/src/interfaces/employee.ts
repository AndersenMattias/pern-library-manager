export interface IEmployee {
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

export interface IEditUser {
  user: IEmployee;
}
