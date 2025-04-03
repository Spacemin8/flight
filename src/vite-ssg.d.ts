declare module 'vite-ssg' {
  import { UserConfig } from 'vite';
  
  export interface ViteSsgOptions {
    script?: string;
    formatting?: 'minify' | 'prettify';
    crittersOptions?: boolean | object;
    dirStyle?: 'nested' | 'flat';
    mock?: boolean;
    includedRoutes?: (paths: string[]) => string[];
    onBeforePageRender?: (route: string) => Promise<void> | void;
    onPageRendered?: (route: string, html: string) => Promise<string> | string;
    onFinished?: () => Promise<void> | void;
  }
  
  export function defineConfig(config: UserConfig): UserConfig;
  
  export default function viteSsg(
    builder: any,
    options?: ViteSsgOptions
  ): any;
}