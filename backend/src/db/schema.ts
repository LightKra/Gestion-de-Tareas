import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Tabla de listas
export const lists = sqliteTable("lists", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 150 }).notNull(),
  color: text("color", { length: 20 }), // Indicador de color opcional
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Tabla de tareas
export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  listId: integer("list_id").references(() => lists.id, { onDelete: "set null" }), // Las tareas pueden no tener lista
  title: text("title", { length: 300 }).notNull(),
  description: text("description"),
  dueDate: integer("due_date", { mode: "timestamp" }), // para "Mi día", "Próximos 7 días" y el calendario
  isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
  priority: integer("priority").notNull(), // 1 = alta, 2 = media, 3 = baja
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Tipos TypeScript para las tablas
export type List = typeof lists.$inferSelect;
export type NewList = typeof lists.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

