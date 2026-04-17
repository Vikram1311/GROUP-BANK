# Group-Bank
small financing for -dream to reality

## Cross-device data sharing (Laptop + Mobile)

By default, app data is stored in each browser's local storage.  
To sync updates across devices, configure a shared JSON API endpoint:

- `VITE_SHARED_STATE_URL` = shared endpoint URL
- `VITE_SHARED_STATE_TOKEN` = optional bearer token
- `VITE_SHARED_STATE_METHOD` = optional HTTP method (`PUT` default, supports `POST` / `PATCH`)

### Expected API behavior

- `GET VITE_SHARED_STATE_URL` should return either:
  - `{ "version": 1, "updatedAt": "...", "state": { ...appState } }`, or
  - direct state object `{ ...appState }`
- Write method (`PUT`/`POST`/`PATCH`) should accept the same envelope JSON body.

Once configured, admin changes made on laptop can be fetched by member mobile sessions using the same shared endpoint.
