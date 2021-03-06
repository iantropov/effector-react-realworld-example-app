import { sample, forward } from 'effector';
import { routerModel } from '../../../core/router';
import {
  getPageFromQueryParamsFx,
  setPageToQueryParamsFx,
} from '../../../library';

import * as yourFeed from './your-feed.model';
import * as globalFeed from './global-feed.model';
import * as feedByTag from './feed-by-tag.model';

// Your feed ----------------------------------------
sample({
  source: yourFeed.$currentPage,
  clock: [yourFeed.PageGate.open, yourFeed.currentPageSetted],
  target: yourFeed.getYourFeedFx,
});

sample({
  source: routerModel.$location,
  clock: yourFeed.PageGate.open,
  target: getPageFromQueryParamsFx,
});

forward({
  from: routerModel.$location,
  to: getPageFromQueryParamsFx,
});

sample({
  source: routerModel.$location,
  clock: yourFeed.currentPageSetted,
  fn: ({ pathname, search }, page) => ({ pathname, search, page }),
  target: setPageToQueryParamsFx,
});

// Global feed ----------------------------------------

sample({
  source: globalFeed.$currentPage,
  clock: [globalFeed.PageGate.open, globalFeed.currentPageSetted],
  target: globalFeed.getGlobalFeedFx,
});

sample({
  source: routerModel.$location,
  clock: globalFeed.PageGate.open,
  target: getPageFromQueryParamsFx,
});

forward({
  from: routerModel.$location,
  to: getPageFromQueryParamsFx,
});

sample({
  source: routerModel.$location,
  clock: globalFeed.currentPageSetted,
  fn: ({ pathname, search }, page) => ({ pathname, search, page }),
  target: setPageToQueryParamsFx,
});

// Feed by Tag ----------------------------------------

sample({
  source: { tag: feedByTag.$currentTag, page: feedByTag.$currentPage },
  clock: [
    feedByTag.$currentTag,
    feedByTag.PageGate.open,
    feedByTag.currentPageSetted,
  ],
  target: feedByTag.getFeedByTagFx,
});

sample({
  source: routerModel.$location,
  clock: feedByTag.PageGate.open,
  target: getPageFromQueryParamsFx,
});

sample({
  source: routerModel.$location,
  clock: feedByTag.currentPageSetted,
  fn: ({ pathname, search }, page) => ({
    pathname,
    search,
    page,
  }),
  target: setPageToQueryParamsFx,
});
