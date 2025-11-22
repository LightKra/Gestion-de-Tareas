export type Task = {
  id: number;
  listId: number | null;
  title: string;
  description: string | null;
  dueDate: Date | null;
  isCompleted: boolean;
  priority: number; // 1 = alta, 2 = media, 3 = baja
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaskData = {
  listId?: number | null;
  title: string;
  description?: string | null;
  dueDate?: string | null; // ISO string
  priority?: number; // 1 = alta, 2 = media, 3 = baja
};

export type UpdateTaskData = {
  listId?: number | null;
  title?: string;
  description?: string | null;
  dueDate?: string | null; // ISO string
  isCompleted?: boolean;
  priority?: number; // 1 = alta, 2 = media, 3 = baja
};

export interface ListType {
  id: number;
  name: string;
  color: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListData {
  name: string;
  color?: string | null;
}

export interface UpdateListData {
  name?: string;
  color?: string | null;
}
