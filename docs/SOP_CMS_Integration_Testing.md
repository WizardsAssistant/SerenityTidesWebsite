# SOP: CMS Integration Testing Protocol

**Purpose:** Ensure complete end-to-end verification of Contentful CMS integrations before considering them complete.

**Applies to:** Any new CMS-enabled content on the Serenity Tides website

**Owner:** Development Team / AI Agents

---

## Testing Phases

### Phase 1: Local Code Verification ✅

**Objective:** Verify code compiles and builds without errors

**Steps:**
1. Navigate to project directory: `cd /home/ubuntu/SerenityTidesWebsite`
2. Run build: `pnpm build`
3. Verify: No TypeScript errors, build completes successfully
4. Check output: Confirm page appears in build output

**Success Criteria:**
- ✅ Build completes without errors
- ✅ TypeScript compilation clean
- ✅ Target page listed in build output

**Status:** ✅ COMPLETED
- Build successful
- No TypeScript errors
- About page in build output

---

### Phase 2: Local Development Server Testing

**Objective:** Verify CMS content displays correctly in local development environment

**Steps:**
1. Start dev server: `pnpm dev` (runs on port 9002)
2. Wait for server to be ready (check logs: `tail /tmp/dev_server.log`)
3. Test page access: `curl http://localhost:9002/about`
4. Verify content: Check that CMS fields are rendering (not fallback)
5. Visual inspection (if browser available): Visit `http://localhost:9002/about`

**Success Criteria:**
- ✅ Dev server starts without errors
- ✅ Page loads successfully
- ✅ CMS content visible in HTML output
- ✅ All integrated fields display correctly

**Status:** ✅ COMPLETED
- Dev server running on port 9002
- Page accessible
- Content rendering correctly (verified via curl)

---

### Phase 3: Local CMS Edit Test

**Objective:** Verify that editing content in Contentful updates the local development site

**Steps:**
1. Note current content value (e.g., "Our Approach" text)
2. Log into Contentful: https://app.contentful.com
3. Navigate to Content → About Page Content entry
4. Make a small, identifiable test edit (e.g., add "🧪 TEST" to end of field)
5. Save as draft (do NOT publish yet)
6. Restart local dev server: `pkill -f "next dev" && pnpm dev`
7. Wait for server restart
8. Verify change appears locally: `curl http://localhost:9002/about | grep "TEST"`
9. **REVERT:** Remove test text in Contentful
10. Restart dev server again to confirm revert

**Success Criteria:**
- ✅ Test edit appears in local environment
- ✅ Content updates after server restart
- ✅ Revert successful

**Status:** 🔄 IN PROGRESS

---

### Phase 4: Production Deployment Verification

**Objective:** Verify code deploys successfully to production

**Steps:**
1. Ensure all changes committed: `git status`
2. Push to GitHub: `git push origin master`
3. Monitor Netlify deployment:
   - Check GitHub Actions (if configured)
   - Or check Netlify dashboard
   - Or wait 2-3 minutes and test live site
4. Verify deployment success: Visit live site
5. Check browser console for errors

**Success Criteria:**
- ✅ Code pushed successfully
- ✅ Netlify deployment triggered
- ✅ Deployment completes without errors
- ✅ Live site accessible
- ✅ No console errors

**Status:** ✅ COMPLETED
- Code pushed (commits: eb1810e, d3dff95)
- Live site verified: https://serenity-tides-website-v2.netlify.app/about
- No console errors

---

### Phase 5: Production CMS Edit Test

**Objective:** Verify end-to-end CMS workflow in production (edit → publish → webhook → deploy → live)

**Steps:**
1. Note current production content
2. Log into Contentful: https://app.contentful.com
3. Navigate to Content → About Page Content entry
4. Make a small, identifiable test edit (e.g., add "🌊 TEST" to end of a field)
5. Click **Publish** (this triggers webhook)
6. Note the time
7. Wait 2-3 minutes for Netlify rebuild
8. Visit live site: https://serenity-tides-website-v2.netlify.app/about
9. Verify test edit appears on live site
10. **REVERT:** Go back to Contentful, remove test text
11. Click **Publish** again
12. Wait 2-3 minutes
13. Verify revert appears on live site

**Success Criteria:**
- ✅ Test edit publishes in Contentful
- ✅ Webhook triggers Netlify deployment
- ✅ Deployment completes (2-3 minutes)
- ✅ Test edit visible on live site
- ✅ Revert successful
- ✅ Original content restored on live site

**Status:** ⏳ PENDING

---

### Phase 6: Documentation and Sign-off

**Objective:** Document test results and mark integration as complete

**Steps:**
1. Review all test phases
2. Confirm all success criteria met
3. Document any issues or workarounds
4. Update completion report with test results
5. Commit test documentation
6. Mark integration as VERIFIED COMPLETE

**Success Criteria:**
- ✅ All phases completed successfully
- ✅ Test results documented
- ✅ SOP followed completely
- ✅ Sign-off recorded

**Status:** ⏳ PENDING

---

## Test Execution Log

### Session: October 16, 2025

**Tester:** Manus AI

| Phase | Status | Time | Notes |
|-------|--------|------|-------|
| 1. Local Code Verification | ✅ PASS | 19:30 UTC | Build successful, no errors |
| 2. Local Dev Server | ✅ PASS | 19:50 UTC | Server running, content rendering |
| 3. Local CMS Edit Test | 🔄 IN PROGRESS | - | Starting now |
| 4. Production Deployment | ✅ PASS | 19:45 UTC | Live site verified |
| 5. Production CMS Edit | ⏳ PENDING | - | After Phase 3 |
| 6. Documentation | ⏳ PENDING | - | Final step |

---

## Common Issues and Solutions

### Issue: Dev server not starting
**Solution:** Check port 9002 is available, kill existing processes: `pkill -f "next dev"`

### Issue: Changes not appearing locally
**Solution:** Restart dev server, clear Next.js cache: `rm -rf .next`

### Issue: Webhook not triggering
**Solution:** Check Contentful webhook configuration, verify Netlify webhook URL

### Issue: Build fails in production
**Solution:** Check Netlify logs, verify environment variables set correctly

---

## Approval

**Test Protocol Approved By:** _________________  
**Date:** _________________

**Integration Verified By:** _________________  
**Date:** _________________

---

**Next Review Date:** After next CMS integration  
**Version:** 1.0  
**Last Updated:** October 16, 2025

