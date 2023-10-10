
import { updateAppConfig } from '#app'
import { defuFn } from '/home/rebase/code/projects/menv-stack/app/node_modules/defu/dist/defu.mjs'

const inlineConfig = {
  "nuxt": {},
  "ui": {
    "primary": "green",
    "gray": "cool",
    "colors": [
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
      "primary"
    ]
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}

import cfg0 from "/home/rebase/code/projects/menv-stack/app/app.config.ts"
import cfg1 from "/home/rebase/code/projects/menv-stack/app/node_modules/@nuxt/ui/dist/runtime/app.config.mjs"

export default /* #__PURE__ */ defuFn(cfg0, cfg1, inlineConfig)
