import type { GridData } from "@/core/types/components";

export function mapToGridData<T>(items: T[], mapFn: (item: T, index: number) => GridData): GridData[] {
  return items.map((item, index) => mapFn(item, index));
}
