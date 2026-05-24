# Conventions

## Bug-fix issue links

When fixing a bug that's tracked in a GitHub issue, add a comment with
the full issue URL in two places:

1. **In the code**, next to the line(s) that implement the fix.
2. **In the test**, next to the regression test(s) that cover it.

Use the full URL (e.g. `https://github.com/tabulator-tables/tabulator/issues/4871`)
rather than a bare `#4871`, so the link works from any context (IDE
hover, GitHub blame, etc.).

A future reader looking at the diff or `git blame` should be able to
find the original bug report without searching.
