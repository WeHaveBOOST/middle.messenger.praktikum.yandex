import { expect } from "chai";
import sinon from "sinon";
import Route from "./Route";
import Block from "../Block";

class DummyRoute extends Route {
  render() {}
}

class Router {
  static __instance: Router;
  routes: any;
  history: any;
  _currentRoute: any;
  _rootQuery;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: object) {
    const route = new DummyRoute(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: any) => {
      event.preventDefault();
      this._onRoute(event.currentTarget.location.pathname);
    }

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const inSystem = sessionStorage.getItem("inSystem");

    switch (pathname) {
      case '/':
        if (inSystem === 'true') {
          this.go('/messenger');
          return;
        }
        break;

      case '/sign-up':
        if (inSystem === 'true') {
          this.go('/messenger');
          return;
        }
        break;

      case '/messenger':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      case '/settings':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      case '/editing-settings':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      case '/editing-password':
        if (!inSystem || inSystem === 'false') {
          this.go('/');
          return;
        }
        break;

      default:
        break;
    }

    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/messenger');
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Route) => route.match(pathname));
  }

  public reset() {
    this.routes = [];
    this._currentRoute = null;
  }
}

describe.only('Router', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;
  const router = new Router('#app');

  beforeEach(() => {
    router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('use() should return Router instance', () => {
    const result = router.use('/', BlockMock);

    expect(result).to.eq(router);
  });

  it('should render a page on start', () => {
    router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(0);
  });

  it('forward', () => {
    router.forward();

    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('back', () => {
    router.back();

    expect((window.history.back as any).callCount).to.eq(1);
  });
})
