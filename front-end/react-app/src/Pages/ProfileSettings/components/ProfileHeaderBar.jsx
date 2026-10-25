import React from "react";

/**
 * Top bar — brand, page label, Discard / Save buttons, avatar thumbnail, Logout.
 */
export default function ProfileHeaderBar({
  formData,
  isDirty,
  initials,
  onDiscard,
  onSave,
  onLogout,
}) {
  return (
    <div className="top-bar">
      <div className="tb-logo">
        <div className="tb-logo-icon">⬡</div>
        <span className="tb-logo-name">Gameunity</span>
      </div>
      <div className="tb-sep"></div>
      <div className="tb-page">⚙️ Profile &amp; Settings</div>
      <div className="tb-right">
        <button
          className="tb-action"
          type="button"
          onClick={onDiscard}
          disabled={!isDirty}
        >
          Discard
        </button>
        <button
          className="tb-action tb-action-save"
          id="btnSaveAll"
          type="button"
          onClick={onSave}
          disabled={!isDirty}
        >
          Save Changes
        </button>
        <div
          className="tb-av user-avatar"
          style={{
            backgroundImage: formData.avatar
              ? `url(${formData.avatar})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          {!formData.avatar && initials}
        </div>
        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
          aria-label="Log out"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
