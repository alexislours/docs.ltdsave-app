<script lang="ts">
  import {
    computeIslandVibe,
    vibeColor,
    vibeLabel,
    OCTANT_COLORS,
    type ResidentVibeInput,
  } from './islandVibe';
  import IslandVibeChart from './IslandVibeChart.svelte';

  const GRID = [
    ['Sweetie', 'Cheerleader', 'Charmer', 'Go-Getter'],
    ['Buddy', 'Daydreamer', 'Merrymaker', 'Dynamo'],
    ['Strategist', 'Perfectionist', 'Achiever', 'Visionary'],
    ['Observer', 'Thinker', 'Rogue', 'Maverick'],
  ] as const;

  const CONTRIBUTION = [-2, -1, 1, 2] as const;
  const SLIDER_FOR_Q = [1, 4, 5, 8] as const;

  let counts = $state<number[]>(Array<number>(16).fill(0));

  function cellIndex(col: number, qRow: number): number {
    return col + qRow * 4;
  }

  function bump(col: number, qRow: number, delta: number) {
    const i = cellIndex(col, qRow);
    counts[i] = Math.max(0, Math.min(99, counts[i] + delta));
  }

  const residents = $derived.by<ResidentVibeInput[]>(() => {
    const out: ResidentVibeInput[] = [];
    let index = 0;
    for (let qRow = 0; qRow < 4; qRow++) {
      for (let col = 0; col < 4; col++) {
        const n = counts[cellIndex(col, qRow)];
        for (let k = 0; k < n; k++) {
          out.push({
            index: index++,
            gaiety: SLIDER_FOR_Q[col],
            activeness: SLIDER_FOR_Q[col],
            audaciousness: SLIDER_FOR_Q[qRow],
            sociability: SLIDER_FOR_Q[qRow],
          });
        }
      }
    }
    return out;
  });

  const vibe = $derived(computeIslandVibe(residents));
  const total = $derived(residents.length);

  function signed(n: number): string {
    return n > 0 ? `+${n}` : `${n}`;
  }

  const peak = $derived(Math.max(Math.abs(vibe.sx), Math.abs(vibe.sy)));
  const threshold = $derived((2 / 3) * total);

  function clear() {
    counts = Array<number>(16).fill(0);
  }

  function randomize() {
    const arr = Array<number>(16).fill(0);
    const n = 10 + Math.floor(Math.random() * 26);
    for (let k = 0; k < n; k++) arr[Math.floor(Math.random() * 16)]++;
    counts = arr;
  }

  $effect(() => {
    randomize();
  });

  function cellColor(col: number, qRow: number): string {
    const cx = CONTRIBUTION[col];
    const cy = CONTRIBUTION[qRow];
    const deg = (Math.atan2(cy, cx) * 180) / Math.PI;
    const o = Math.floor(((((deg + 22.5) % 360) + 360) % 360) / 45);
    return OCTANT_COLORS[o];
  }
</script>

<div class="vibe-playground not-content">
  <div class="result">
    <div class="vibe-head">
      <span class="pill" style:background-color={vibeColor(vibe)}>{vibeLabel(vibe.key)}</span>
    </div>
    <dl class="readout">
      <div><dt>Vector</dt><dd>(SX, SY) = ({signed(vibe.sx)}, {signed(vibe.sy)})</dd></div>
      <div><dt>Residents</dt><dd>{total}</dd></div>
      <div>
        <dt>Strength</dt>
        <dd>
          max(|SX|, |SY|) = {peak}
          {peak > threshold ? '>' : '≤'} ⅔·{total} = {threshold.toFixed(1)}
          → <b>{vibe.strength === 'normal' ? 'balanced' : vibe.strength}</b>
        </dd>
      </div>
    </dl>
    <IslandVibeChart {vibe} />
  </div>

  <div class="editor">
    <div class="editor-head">
      <strong>Your residents</strong>
      <span class="muted">{total} resident{total === 1 ? '' : 's'}</span>
    </div>
    <p class="muted hint">Click a personality to add a resident there. Right-click to remove one.</p>
    <div class="grid" role="group" aria-label="Personality grid">
      {#each [0, 1, 2, 3] as displayRow (displayRow)}
        {@const qRow = 3 - displayRow}
        {#each [0, 1, 2, 3] as col (col)}
          {@const i = cellIndex(col, qRow)}
          {@const n = counts[i]}
          <button
            type="button"
            class="cell"
            class:filled={n > 0}
            style:--cell={cellColor(col, qRow)}
            onclick={() => bump(col, qRow, 1)}
            oncontextmenu={(e) => {
              e.preventDefault();
              bump(col, qRow, -1);
            }}
            title={`${GRID[displayRow][col]} — left-click +1, right-click −1`}
          >
            <span class="cell-name">{GRID[displayRow][col]}</span>
            {#if n > 0}<span class="cell-count">{n}</span>{/if}
          </button>
        {/each}
      {/each}
    </div>
    <div class="axes muted">
      <span>← Reserved / Considerate&nbsp;&nbsp;·&nbsp;&nbsp;Ambitious / Outgoing →</span>
    </div>

    <div class="controls">
      <button type="button" class="btn" onclick={randomize}>Random island</button>
      <button type="button" class="btn" onclick={clear} disabled={total === 0}>Clear</button>
    </div>
  </div>
</div>

<style>
  .vibe-playground {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .editor {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .editor-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    max-width: 28rem;
  }
  .hint {
    width: 100%;
    max-width: 28rem;
  }
  .muted {
    color: var(--sl-color-gray-3);
    font-size: 0.8rem;
  }
  .hint {
    margin: 0.25rem 0 0.5rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    max-width: 28rem;
  }
  .cell {
    position: relative;
    aspect-ratio: 1.35;
    border: 1px solid var(--sl-color-gray-5);
    border-radius: 6px;
    background: var(--sl-color-gray-6);
    color: var(--sl-color-gray-2);
    font-size: 0.66rem;
    line-height: 1.1;
    padding: 0.2rem;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;
    transition:
      background 0.1s,
      border-color 0.1s;
  }
  .cell:hover {
    border-color: var(--cell);
  }
  .cell.filled {
    background: color-mix(in srgb, var(--cell) 22%, var(--sl-color-gray-6));
    border-color: var(--cell);
    color: var(--sl-color-white);
  }
  .cell-name {
    font-weight: 600;
  }
  .cell-count {
    position: absolute;
    right: 0.3rem;
    bottom: 0.2rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--sl-color-white);
  }
  .axes {
    margin-top: 0.4rem;
    max-width: 28rem;
    text-align: center;
  }
  .controls {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 0.85rem 0 0;
  }
  .btn {
    font-size: 0.8rem;
    padding: 0.35rem 0.8rem;
    border-radius: 6px;
    border: 1px solid var(--sl-color-gray-5);
    background: var(--sl-color-gray-6);
    color: var(--sl-color-text);
    cursor: pointer;
  }
  .btn:hover:not(:disabled) {
    border-color: var(--sl-color-accent);
  }
  .btn:disabled {
    opacity: 0.5;
    cursor: default;
  }
  .result {
    min-width: 0;
  }
  .vibe-head {
    margin-bottom: 0.6rem;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.3rem 1rem;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
  }
  .readout {
    margin: 0 0 0.75rem;
    font-size: 0.78rem;
  }
  .readout > div {
    display: flex;
    gap: 0.5rem;
    padding: 0.15rem 0;
  }
  .readout dt {
    color: var(--sl-color-gray-3);
    min-width: 5rem;
  }
  .readout dd {
    margin: 0;
    font-variant-numeric: tabular-nums;
  }
</style>
