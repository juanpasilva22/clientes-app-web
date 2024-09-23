import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { environmentLoader } from "./environments/environmentLoader";

declare global {
  interface Navigator {
    msSaveOrOpenBlob?: (blob: any, defaultName?: string) => boolean;
  }
}

environmentLoader.then((env) => {
  Object.keys(env).forEach((key) => (environment[key] = env[key]));

  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});