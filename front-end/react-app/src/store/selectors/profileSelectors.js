import { createSelector } from '@reduxjs/toolkit';
import { selectProfile } from '../slices/profileSlice';

const COMPLETENESS_FIELDS = ['firstName', 'lastName', 'email', 'bio', 'phone', 'avatar'];

export const selectProfileCompleteness = createSelector([selectProfile], (profile) => {
  const completed = COMPLETENESS_FIELDS.filter((field) => Boolean(profile?.[field]?.trim())).length;
  return Math.round(100 * completed / COMPLETENESS_FIELDS.length);
});

export const selectActiveSanctionSummary = createSelector(
  [(state) => state.appeal.sanction, selectProfile],
  (sanction, profile) => ({
    sanction,
    reason: sanction?.reason || profile?.sanctionReason || null,
    until: sanction?.until || null,
  }),
);
