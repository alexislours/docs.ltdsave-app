import { getCollection } from 'astro:content';

type State = 'undocumented' | 'partial' | 'documented';
type Kind = 'root' | 'group' | 'template';
export type SchemaKey = 'player' | 'mii' | 'map';

export type Page = {
  id: string;
  schema: SchemaKey;
  path: string;
  kind: Kind;
  title: string;
  leafCount: number;
  documented: number;
  partial: number;
  undocumented: number;
  uniqueLeafCount: number;
  uniqueDocumented: number;
  uniquePartial: number;
  uniqueUndocumented: number;
};

export type Totals = {
  leafCount: number;
  documented: number;
  partial: number;
  undocumented: number;
  uniqueLeafCount: number;
  uniqueDocumented: number;
  uniquePartial: number;
  uniqueUndocumented: number;
};

export const SCHEMA_KEYS: readonly SchemaKey[] = ['player', 'mii', 'map'] as const;

export const SCHEMA_LABELS: Record<SchemaKey, string> = {
  player: 'Player.sav',
  mii: 'Mii.sav',
  map: 'Map.sav',
};

export const SCHEMA_ACCENTS: Record<SchemaKey, string> = {
  player: '#ea580c',
  mii: '#0ea5e9',
  map: '#8b5cf6',
};

export function pct(n: number, d: number): number {
  return d === 0 ? 0 : (n / d) * 100;
}

export function fmtPct(n: number, d: number): string {
  return d === 0 ? '-' : pct(n, d).toFixed(1) + '%';
}

function emptyTotals(): Totals {
  return {
    leafCount: 0,
    documented: 0,
    partial: 0,
    undocumented: 0,
    uniqueLeafCount: 0,
    uniqueDocumented: 0,
    uniquePartial: 0,
    uniqueUndocumented: 0,
  };
}

function addTotals(target: Totals, page: Page): void {
  target.leafCount += page.leafCount;
  target.documented += page.documented;
  target.partial += page.partial;
  target.undocumented += page.undocumented;
  target.uniqueLeafCount += page.uniqueLeafCount;
  target.uniqueDocumented += page.uniqueDocumented;
  target.uniquePartial += page.uniquePartial;
  target.uniqueUndocumented += page.uniqueUndocumented;
}

export async function loadCoverage(): Promise<{
  pages: Page[];
  totals: Totals;
  bySchema: Record<SchemaKey, Page[]>;
  schemaTotals: Record<SchemaKey, Totals>;
}> {
  const entries = await getCollection('docs', (entry) => {
    const data = entry.data as Record<string, unknown>;
    return typeof data.schema === 'string' && Array.isArray(data.leaves);
  });

  const pages: Page[] = entries.map((entry) => {
    const data = entry.data as {
      schema: SchemaKey;
      path?: string;
      kind?: Kind;
      title: string;
      instanceCount?: number;
      leaves?: { state: State }[];
    };
    const leaves = data.leaves ?? [];
    const multiplier = data.kind === 'template' ? (data.instanceCount ?? 1) : 1;
    let documented = 0;
    let partial = 0;
    let undocumented = 0;
    for (const leaf of leaves) {
      if (leaf.state === 'documented') documented++;
      else if (leaf.state === 'partial') partial++;
      else undocumented++;
    }
    return {
      id: entry.id,
      schema: data.schema,
      path: data.path ?? '',
      kind: data.kind ?? 'group',
      title: data.title,
      leafCount: leaves.length * multiplier,
      documented: documented * multiplier,
      partial: partial * multiplier,
      undocumented: undocumented * multiplier,
      uniqueLeafCount: leaves.length,
      uniqueDocumented: documented,
      uniquePartial: partial,
      uniqueUndocumented: undocumented,
    };
  });

  const totals = emptyTotals();
  const bySchema: Record<SchemaKey, Page[]> = { player: [], mii: [], map: [] };
  const schemaTotals: Record<SchemaKey, Totals> = {
    player: emptyTotals(),
    mii: emptyTotals(),
    map: emptyTotals(),
  };

  for (const page of pages) {
    addTotals(totals, page);
    addTotals(schemaTotals[page.schema], page);
    bySchema[page.schema].push(page);
  }
  for (const key of SCHEMA_KEYS) {
    bySchema[key].sort((a, b) => a.path.localeCompare(b.path));
  }

  return { pages, totals, bySchema, schemaTotals };
}
