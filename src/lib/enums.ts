import { getCollection } from 'astro:content';
import * as enumOptions from '../data/schemas/enumOptions.ts';
import { hashHex } from './hash.ts';

export type EnumName = keyof typeof enumOptions;

export const ENUM_NAMES = Object.keys(enumOptions).sort() as EnumName[];

export function enumSlug(name: string): string {
  return name.toLowerCase().replace(/_/g, '-');
}

export function enumHref(name: string): string {
  return `/save-reference/enums/${enumSlug(name)}/`;
}

export function enumValues(name: string): readonly string[] | null {
  if (name in enumOptions) {
    return (enumOptions as Record<string, readonly string[]>)[name] ?? null;
  }
  return null;
}

export function enumValueHash(name: string): string {
  return hashHex(name);
}

export type EnumUsage = {
  hash: string;
  leafName: string;
  groupTitle: string;
  href: string;
};

let usageCache: Map<string, EnumUsage[]> | null = null;

export async function loadEnumUsage(): Promise<Map<string, EnumUsage[]>> {
  if (usageCache) return usageCache;
  const map = new Map<string, EnumUsage[]>();
  const entries = await getCollection('docs', (entry) => {
    const data = entry.data as { leaves?: unknown };
    return Array.isArray(data.leaves);
  });
  for (const entry of entries) {
    const data = entry.data as {
      title: string;
      leaves?: { name: string; hash: string; options?: string }[];
    };
    const groupHref = `/${entry.id.replace(/\/index$/, '')}/`;
    for (const leaf of data.leaves ?? []) {
      if (!leaf.options) continue;
      const list = map.get(leaf.options) ?? [];
      list.push({
        hash: leaf.hash,
        leafName: leaf.name,
        groupTitle: data.title,
        href: `${groupHref}#${leaf.name.toLowerCase()}`,
      });
      map.set(leaf.options, list);
    }
  }
  for (const list of map.values()) {
    list.sort(
      (a, b) => a.groupTitle.localeCompare(b.groupTitle) || a.leafName.localeCompare(b.leafName),
    );
  }
  usageCache = map;
  return map;
}
