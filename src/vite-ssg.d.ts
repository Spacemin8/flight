declare module 'vite-react-ssg' {
  import { ComponentType } from 'react';
  import { RouteObject } from 'react-router-dom';

  export interface ViteReactSSGOptions {
    script?: 'sync' | 'async' | 'defer';
    formatting?: 'minify' | 'prettify';
    crittersOptions?: boolean | object;
    dirStyle?: 'nested' | 'flat';
    mock?: boolean;
    routes?: string[];
    routePatterns?: string[];
    onBeforePageRender?: (route: string) => Promise<void> | void;
    onPageRendered?: (route: string, html: string) => Promise<string> | string;
    onFinished?: () => Promise<void> | void;
  }

  export interface AppCreator {
    app: ComponentType;
    routes?: string[];
    routeObjects?: RouteObject[];
    base?: string;
  }

  export function defineConfig(
    config: ViteReactSSGOptions
  ): ViteReactSSGOptions;

  export default function viteSsg(
    appCreator: AppCreator | (() => AppCreator),
    options?: ViteReactSSGOptions
  ): any;
}
