# SOP: Pull Request Workflow

**Purpose:** Ensure all code changes go through proper review process via Pull Requests

**Applies to:** All code changes to the Serenity Tides website

**Owner:** Development Team / AI Agents

---

## Core Principle

**NEVER push directly to master.** All code changes MUST go through the Pull Request process.

---

## Workflow Steps

### Step 1: Create Feature Branch

Always create a feature branch from the latest master:

```bash
git checkout master
git pull origin master
git checkout -b feature/descriptive-name
```

**Branch Naming Convention:**
- `feature/` - New features (e.g., `feature/about-page-cms`)
- `fix/` - Bug fixes (e.g., `fix/broken-link`)
- `docs/` - Documentation only (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-api`)

### Step 2: Make Changes

Make your code changes on the feature branch:

```bash
# Make changes to files
git add .
git commit -m "descriptive commit message"
```

**Commit Message Format:**
- Use conventional commits: `type: description`
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Example: `feat: add CMS integration for About page`

### Step 3: Test Locally

Before pushing, complete local testing according to the CMS Integration Testing SOP:

- ✅ Build successful
- ✅ TypeScript compilation clean
- ✅ Local dev server working
- ✅ All features functioning correctly

### Step 4: Push Feature Branch

Push your feature branch to GitHub:

```bash
git push origin feature/descriptive-name
```

### Step 5: Create Pull Request

Create a PR on GitHub:

1. Visit the repository on GitHub
2. Click "Pull requests" → "New pull request"
3. Select your feature branch
4. Fill in PR template with:
   - Summary of changes
   - Testing completed
   - Screenshots (if applicable)
   - Any special deployment notes

**PR Title Format:**
- Use same format as commit messages
- Example: `feat: About Page CMS Integration`

### Step 6: Review and Merge

Wait for review and approval:

1. Address any review comments
2. Make additional commits if needed
3. Once approved, merge the PR
4. Delete the feature branch

### Step 7: Verify Deployment

After merge, verify the deployment:

1. Check Netlify deployment triggered
2. Wait for deployment to complete
3. Test live site functionality
4. Verify no errors in production

---

## What NOT To Do

### ❌ Direct Push to Master

**WRONG:**
```bash
git checkout master
git add .
git commit -m "changes"
git push origin master  # ❌ NEVER DO THIS
```

**RIGHT:**
```bash
git checkout -b feature/my-changes
git add .
git commit -m "changes"
git push origin feature/my-changes  # ✅ Push feature branch
# Then create PR on GitHub
```

### ❌ Skipping Testing

**WRONG:**
- Commit code
- Push immediately
- Hope it works in production

**RIGHT:**
- Commit code
- Test locally (follow SOP)
- Verify everything works
- Then push and create PR

### ❌ Vague PR Descriptions

**WRONG:**
```
Title: Updates
Body: Made some changes
```

**RIGHT:**
```
Title: feat: Add CMS integration for About page
Body: 
- Implemented Contentful integration for 5 text sections
- Added TypeScript types and fallback content
- Created comprehensive documentation
- Tested locally, all tests passing
```

---

## Recovery from Direct Push

If you accidentally pushed directly to master:

### Option 1: Create Retroactive PR (Preferred)

```bash
# Create feature branch from before your changes
git checkout -b feature/my-changes <commit-before-yours>

# Cherry-pick your commits
git cherry-pick <your-commit-hash>

# Push feature branch
git push origin feature/my-changes

# Create PR on GitHub
```

### Option 2: Revert and Redo

```bash
# Revert the direct push
git revert <your-commit-hash>
git push origin master

# Create proper feature branch
git checkout -b feature/my-changes
# Make changes again
git commit -m "proper message"
git push origin feature/my-changes
# Create PR
```

---

## PR Review Checklist

Before approving a PR, verify:

- [ ] Code builds successfully
- [ ] All tests passing
- [ ] Documentation updated
- [ ] No secrets committed
- [ ] Follows coding standards
- [ ] Breaking changes documented
- [ ] Deployment plan clear

---

## Deployment Verification Checklist

After PR merge, verify:

- [ ] Netlify deployment triggered
- [ ] Build completed successfully
- [ ] Live site accessible
- [ ] New features working
- [ ] No console errors
- [ ] Performance acceptable

---

## Benefits of PR Workflow

1. **Code Review**: Catch issues before production
2. **Documentation**: PR description documents what changed and why
3. **Testing Gate**: Ensures testing happens before deployment
4. **Rollback**: Easy to revert if issues arise
5. **Collaboration**: Team can discuss changes
6. **Audit Trail**: Clear history of what was changed when

---

## Emergency Hotfix Process

For critical production issues:

1. Create hotfix branch from master: `git checkout -b hotfix/critical-issue`
2. Make minimal fix
3. Test thoroughly
4. Create PR with "HOTFIX" label
5. Fast-track review
6. Merge and deploy immediately
7. Monitor production closely

Even in emergencies, **use the PR process**.

---

## Automation Opportunities

Consider setting up:

- Branch protection rules (require PR for master)
- Automated testing on PR creation
- Automated deployment previews
- PR template auto-population
- Status checks before merge

---

**Version:** 1.0  
**Last Updated:** October 16, 2025  
**Next Review:** After 10 PRs or 3 months

