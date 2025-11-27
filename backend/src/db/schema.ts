import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// Tabla de listas
export const lists = pgTable("lists", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  color: text("color"), // Indicador de color opcional
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Tabla de tareas
export const tasks = pgTable("tasks", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  listId: integer("list_id").references(() => lists.id, { onDelete: "set null" }), // Las tareas pueden no tener lista
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"), // para "Mi día", "Próximos 7 días" y el calendario
  isCompleted: boolean("is_completed").notNull().default(false),
  priority: integer("priority").notNull(), // 1 = alta, 2 = media, 3 = baja
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Tipos TypeScript para las tablas
export type List = typeof lists.$inferSelect;
export type NewList = typeof lists.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

