/**
 * The group-wide delivery process, used by the pinned horizontal stepper on
 * the homepage. Mirrors the "deliver to every destination" metaphor.
 */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We load up on context — auditing your brand, market, audience and competition to find the real lever for growth.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'We plot the route: positioning, channel mix, budget and the measurable goals every destination has to hit.',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'One crew designs, builds and produces across every format you need — brand, web, media, documentation.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'We ship on a tight schedule and cross every speed-breaker — campaigns, sites and media, live on time.',
  },
  {
    number: '05',
    title: 'Optimize',
    description:
      'We read the data, double down on what works and cut what doesn’t — so the load keeps delivering returns.',
  },
];
