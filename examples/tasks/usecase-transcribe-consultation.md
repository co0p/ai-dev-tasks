# Use Case: Doctor Transcribes Consultation with Live and Optimized Views

## User Goal

As a doctor, I want to see a live transcription during my consultation and later access an optimized version, so I can reference key points during the appointment while still getting high-quality documentation for patient records afterward.

**Why it matters:** Doctors need immediate access to what was said during the consultation (for quick reference and memory triggers) but also need accurate, polished transcriptions for official medical records. A two-phase approach provides immediate value while ensuring quality documentation.

## Assumption Being Tested

This use case tests three related assumptions:
1. Doctors will successfully use their phones to record during live consultations
2. Real-time transcription is valuable even if imperfect (post-processing improves it later)
3. The two-phase workflow (immediate live view + later optimized version) is better than waiting for perfect transcription

## User Context

**When:** During a live patient consultation in an exam room.

**Situation:** The doctor is conducting a consultation and wants to capture the conversation (symptoms, diagnosis, treatment plan) without typing notes. They need quick reference during the session but will create formal documentation later.

**Current workaround:** Doctors either type notes during the consultation (disrupting patient interaction), handwrite notes afterward (time-consuming), or rely purely on memory when documenting later (error-prone).

**Two-phase need:** 
- **During consultation:** Quick glance at transcription to verify key details were captured
- **After hours:** Use optimized transcription to create patient records efficiently

## Main Success Scenario

**Phase 1: During Consultation (Live Transcription)**
1. Doctor opens mediaid app on phone at start of consultation
2. Doctor taps "Start Recording"
3. System shows recording indicator and begins displaying live transcription text
4. Doctor conducts consultation while occasionally glancing at live transcription
5. Doctor sees key points appearing in real-time (symptoms, medications mentioned)
6. At end of consultation, doctor taps "Stop Recording"
7. System confirms recording saved and shows "Optimizing transcription..."
8. Doctor closes app and moves to next patient

**Phase 2: Later (Optimized Transcription)**
9. Doctor returns to mediaid app later (during documentation time)
10. Doctor sees list of today's consultations
11. Doctor taps on specific patient's consultation
12. System displays optimized transcription (cleaned up, formatted, more accurate)
13. Doctor reviews optimized transcription
14. Doctor proceeds to use transcription for patient records

**Expected time:** Phase 1 during consultation (live view), Phase 2 later same day (5-30 minutes after recording)

## Alternative Paths

**Path A: Doctor doesn't glance at live transcription**
- Step 4a: Doctor records but doesn't look at live transcription during consultation
- Doctor trusts it's working, checks optimized version later
- Continue from step 9

**Path B: Doctor wants to re-listen to audio**
- Step 13b: Doctor taps "Play Audio" to verify specific details
- Audio plays alongside optimized transcription
- Continue from step 14

**Path C: Multiple consultations before reviewing**
- Step 9c: Doctor has multiple recordings from the day
- Doctor reviews them all in batch during end-of-day documentation
- Doctor sees all consultations with "Optimized" indicator

## Acceptance Criteria

- [ ] Doctor can start recording with one tap
- [ ] Live transcription text appears in real-time during recording
- [ ] Live transcription is visible and readable while recording continues
- [ ] Doctor can stop recording with one tap
- [ ] System confirms recording is saved
- [ ] Doctor can close app and recording/transcription is preserved
- [ ] Doctor can return to app later (hours later) and see list of recordings
- [ ] Each recording shows clear indicator of optimization status (processing/ready)
- [ ] Doctor can view optimized transcription when ready
- [ ] Optimized transcription is noticeably improved from live version
- [ ] Doctor can access original audio recording if needed
- [ ] System works on doctor's phone (iOS or Android browser)

## Success Metrics

**Primary:**
- Time savings: Doctors report saving 5+ minutes per consultation on documentation
- Doctors complete both phases (record during + review later) for 70%+ of consultations

**Secondary:**
- 5+ doctors use the feature at least 3x per week
- Doctors report optimized transcription is more accurate than live version
- Doctors report workflow feels natural (doesn't disrupt patient interaction)

## Failure Signals

- Doctors only use live transcription OR only use optimized (not both phases)
- < 50% of recordings are reviewed later (doctors abandon after recording)
- Doctors report live transcription is too distracting during consultation
- Doctors report optimized version isn't significantly better than live
- Doctors stop using feature after first week
- Time to optimization is too long (> 1 hour) making it less useful

## Out of Scope

- ❌ Editing transcription text (v1 is read-only view)
- ❌ Structuring transcription into medical templates
- ❌ Automatic save to patient management software
- ❌ Real-time collaboration (multiple doctors viewing same transcription)
- ❌ Speaker identification (doctor vs patient)
- ❌ Notifications when optimization is complete
- ❌ Comparison view showing live vs optimized differences
- ❌ Custom optimization preferences (medical specialty-specific)
- ❌ Offline mode (requires internet connection)
- ❌ Integration with specific EMR/EHR systems

## Open Questions

1. **Optimization timing:** How long should optimization take? (Target: < 5 minutes? < 30 minutes?)
2. **Storage duration:** How long should recordings and transcriptions be kept? (Constitution says 48 hours - is that enough for delayed review?)
3. **Optimization visibility:** Should doctor see progress indicator or just "processing" status?
4. **Multiple recordings:** How should recordings be organized? (By date? By patient name? Timeline?)
5. **Live transcription quality:** What's acceptable accuracy for live transcription if optimization improves it? (70%? 80%?)
6. **Patient consent:** Do we need explicit consent UI before recording? (May vary by jurisdiction)
7. **Optimization failure:** What happens if post-processing fails? Do they still get live transcription?
8. **Audio quality:** Should we warn doctors if audio quality is poor during recording?

---

**Note:** Technical implementation details (how live transcription works, how optimization is performed, APIs used, etc.) will be defined in a separate technical design document that references this use case.
