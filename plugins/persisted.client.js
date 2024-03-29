// // plugins/persistedstate.client.js
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

export default function ({ $pinia }) {
  if (process.client) {
    $pinia.use(
      createPersistedStatePlugin({
        // plugin options goes here
      }),
    )
  }
}