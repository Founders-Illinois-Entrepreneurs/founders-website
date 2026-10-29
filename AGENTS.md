# Notes for coding agents

- This is the static site at foundersillinois.org, owned by the Founders-Illinois-Entrepreneurs GitHub org. Each subdomain has its own repo, named after it. For example, the events app is https://github.com/Founders-Illinois-Entrepreneurs/events: clone it next to this one to use it as context.
- Most content lives in `content/` (see README). Change data there rather than hard-coding text in pages.
- The site is a static export (`output: "export"` in `next.config.ts`): no server code, API routes, or server actions.
- Check `npm run typecheck` and `npm run build` before committing.
- The repo is public: never commit secrets or personal data.
