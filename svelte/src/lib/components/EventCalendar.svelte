<script>
	import { Disclosure } from '#lib/disclosure.svelte.js';

	/**
	 * Figma's D - Calendar / M - Calendar: a grey bar with the month and how
	 * many events are on in it, opening over the page below into that
	 * month's days. Days with an event on are black with a purple dot over
	 * them, the rest grey, and today is in a purple box. Previous and Next
	 * change the month. `days` has each event's first and last day (see
	 * daysOf); `today` is today's (see dayKey), and its month shows first.
	 */
	let { days, today, class: className } = $props();

	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
	const monthTitle = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
	const id = $props.id();

	const disclosure = new Disclosure();

	// The month showing, as its 1st at midnight UTC: today's to start, then
	// whichever Previous and Next go to
	let shown = $derived(new Date(`${today.slice(0, 7)}-01T00:00:00Z`));

	// A day of the month `months` after the one showing; day 0 is the last
	// of the month before
	const dayIn = (months, day) =>
		new Date(Date.UTC(shown.getUTCFullYear(), shown.getUTCMonth() + months, day));

	let title = $derived(monthTitle.format(shown));
	let previous = $derived(dayIn(-1, 1));
	let next = $derived(dayIn(1, 1));
	let monthKey = $derived(shown.toISOString().slice(0, 7));
	let events = $derived(
		days.filter(({ from, to }) => from.slice(0, 7) <= monthKey && to.slice(0, 7) >= monthKey)
	);

	// The month's days in weeks from Sunday, null before the 1st and after
	// the last
	let weeks = $derived.by(() => {
		const cells = [
			...Array(shown.getUTCDay()).fill(null),
			...Array.from({ length: dayIn(1, 0).getUTCDate() }, (_, i) => i + 1)
		];
		while (cells.length % 7) cells.push(null);
		return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
	});

	const keyOf = (day) => `${monthKey}-${String(day).padStart(2, '0')}`;
</script>

<!-- Holds the bar's place; the calendar opens over what's below -->
<div class={['calendar', className]}>
	<div {@attach disclosure.attach} class="absolute inset-x-0 top-0 z-10 rounded-def bg-ui">
		<button
			type="button"
			aria-expanded={disclosure.open}
			aria-controls={id}
			onclick={disclosure.toggle}
			class="bar"
		>
			<span class="absolute left-sm text-body text-highlight text-trim lg:tracking-[-0.02em]">
				{events.length}
				{events.length === 1 ? 'Event' : 'Events'}
			</span>
			<span class="text-control text-trim">{title}</span>
			<svg
				aria-hidden="true"
				viewBox="0 0 50 50"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M18 21.5 25 28.5 32 21.5" />
			</svg>
		</button>
		<div {id} hidden={!disclosure.open}>
			<table>
				<caption class="sr-only">{title}</caption>
				<thead>
					<tr>
						{#each weekdays as weekday (weekday)}
							<th scope="col" abbr={weekday} class="text-label">
								<span class="block text-trim">{weekday.slice(0, 3)}</span>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each weeks as week, w (w)}
						<tr>
							{#each week as day, d (d)}
								{@const key = day && keyOf(day)}
								{@const hasEvents = day && events.some(({ from, to }) => from <= key && key <= to)}
								<td class={{ 'has-events': hasEvents }}>
									{#if day}
										<span aria-current={key === today ? 'date' : undefined} class="day">
											{day}
											{#if hasEvents}<span class="sr-only">, events</span>{/if}
										</span>
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="flex gap-[1rem] p-xs">
				<!-- Kept as the same two buttons as the month changes, so a click
				     on one is still inside the calendar when the window hears it -->
				{#each [`← ${monthName.format(previous)}`, `${monthName.format(next)} →`] as label, i (i)}
					<button type="button" onclick={() => (shown = i ? next : previous)} class="step">
						{label}
					</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	@reference '../../routes/layout.css';

	.calendar {
		--bar-height: 4.8rem;
		position: relative;
		width: 100%;
		height: var(--bar-height);

		@media (width >= 1024px) {
			--bar-height: 5rem;
			width: 45.2rem;
		}
	}

	/* The month, with the count to its left and the chevron, which flips
	   while it's open, to its right */
	.bar {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: var(--bar-height);

		& svg {
			position: absolute;
			right: 0;
			width: var(--bar-height);
			color: rgb(0 0 0 / 0.5);
		}

		&[aria-expanded='true'] svg {
			rotate: 180deg;
		}
	}

	table {
		width: calc(100% - 2 * var(--spacing-sm));
		margin-inline: var(--spacing-sm);
		padding-block: var(--spacing-md);
		border-top: 2px solid rgb(0 0 0 / 0.2);
		border-collapse: separate;
		border-spacing: 0;
		table-layout: fixed;
	}

	td {
		padding-top: var(--spacing-sm);
		text-align: center;

		/* The dot over a day with events, or the room for one */
		&::before {
			content: '';
			display: block;
			width: 0.8rem;
			aspect-ratio: 1;
			margin-inline: auto;
			border-radius: 50%;

			@media (width >= 1024px) {
				width: 1rem;
			}
		}

		&.has-events::before {
			background-color: var(--color-highlight);
		}
	}

	.day {
		@apply text-h3 text-trim;
		position: relative;
		z-index: 0;
		display: inline-block;
		margin-top: var(--spacing-xs);
		color: rgb(0 0 0 / 0.3);

		.has-events & {
			color: var(--color-black);
		}

		/* Today: white in a purple box that doesn't move the number */
		&[aria-current='date'] {
			color: var(--color-white);

			&::before {
				content: '';
				position: absolute;
				inset: -0.9rem -1.2rem;
				z-index: -1;
				border-radius: var(--radius-def);
				background-color: var(--color-highlight);
			}
		}
	}

	.step {
		@apply text-body text-trim;
		flex: 1;
		padding: 1rem var(--spacing-xs);
		border-radius: var(--radius-def);
		background-color: rgb(0 0 0 / 0.1);

		@media (width >= 1024px) {
			line-height: 1;
		}
	}
</style>
