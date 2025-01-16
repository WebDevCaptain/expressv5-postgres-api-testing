## Commands

1. To create books table migration file

```bash
npm run migrate create add books table
```

2. Edit the migration file with some custom logic for up & down

3. Run the migration using

```bash
DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database> npm run migrate up
```
