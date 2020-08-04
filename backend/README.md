Start the backend server with the following command :

```sh
yarn dev #port 3003 by default
```

This returns the aggregated data :

```bash
curl localhost:3003
```

This returns the data sorted by category

```bash
curl localhost:3003/?sortBy=category
```

This returns the data sorted by priority

```bash
curl localhost:3003/?sortBy=priority
```
