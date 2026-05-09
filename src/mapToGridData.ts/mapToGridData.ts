import type { GridData } from '../core/Types';

export function mapToGridData<T>(items: T[], mapFn: (item: T, index: number) => GridData): GridData[] {
  return items.map((item, index) => mapFn(item, index));
}