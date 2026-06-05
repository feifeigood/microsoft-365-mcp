import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { getCombinedPresetPattern, TOOL_CATEGORIES } from '../src/tool-categories.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const endpoints = JSON.parse(
  readFileSync(path.join(__dirname, '..', 'src', 'endpoints.json'), 'utf8')
) as Array<{ toolName: string }>;
const allToolNames = [...new Set(endpoints.map((e) => e.toolName))];

// Mirrors the runtime filter in graph-tools.ts: new RegExp(pattern, 'i').test(alias)
function matchPreset(preset: string): string[] {
  const re = new RegExp(getCombinedPresetPattern([preset]), 'i');
  return allToolNames.filter((n) => re.test(n));
}

describe('app-scoped presets', () => {
  for (const preset of ['outlook', 'onedrive', 'teams'] as const) {
    describe(preset, () => {
      const expected = TOOL_CATEGORIES[preset].tools ?? [];

      it('defines an explicit tools allow-list', () => {
        expect(expected.length).toBeGreaterThan(0);
      });

      it('every listed tool exists in endpoints.json (no dead entries)', () => {
        const dead = expected.filter((t) => !allToolNames.includes(t));
        expect(dead).toEqual([]);
      });

      it('matches exactly its allow-list (no cross-app leakage)', () => {
        const matched = matchPreset(preset);
        expect(new Set(matched)).toEqual(new Set(expected));
        expect(matched.length).toBe(expected.length);
      });
    });
  }

  it('outlook/onedrive/teams are mutually disjoint', () => {
    const sets = {
      outlook: new Set(TOOL_CATEGORIES.outlook.tools),
      onedrive: new Set(TOOL_CATEGORIES.onedrive.tools),
      teams: new Set(TOOL_CATEGORIES.teams.tools),
    };
    const pairs: Array<[keyof typeof sets, keyof typeof sets]> = [
      ['outlook', 'onedrive'],
      ['outlook', 'teams'],
      ['onedrive', 'teams'],
    ];
    for (const [a, b] of pairs) {
      const overlap = [...sets[a]].filter((x) => sets[b].has(x));
      expect(overlap).toEqual([]);
    }
  });

  it('combining all three equals their union with no leakage', () => {
    const re = new RegExp(getCombinedPresetPattern(['outlook', 'onedrive', 'teams']), 'i');
    const matched = allToolNames.filter((n) => re.test(n));
    const union = new Set([
      ...(TOOL_CATEGORIES.outlook.tools ?? []),
      ...(TOOL_CATEGORIES.onedrive.tools ?? []),
      ...(TOOL_CATEGORIES.teams.tools ?? []),
    ]);
    expect(new Set(matched)).toEqual(union);
  });

  it('teams requires org mode', () => {
    expect(TOOL_CATEGORIES.teams.requiresOrgMode).toBe(true);
  });
});
