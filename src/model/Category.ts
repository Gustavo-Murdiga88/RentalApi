import { randomUUID } from "node:crypto";

export class Category {
  id: string;
  description: string;
  name: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
