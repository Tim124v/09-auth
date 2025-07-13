"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { updateUser } from "@/lib/api/clientApi";

export default function EditProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState(user?.username || "");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState<string>("");
  const router = useRouter();

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFieldError("");
    const trimmed = username.trim();
    if (trimmed.length < 3 || trimmed.length > 20) {
      setFieldError("Username must be between 3 and 20 characters");
      return;
    }
    try {
      const updatedUser = await updateUser({ username: trimmed });
      setUser(updatedUser);
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Profile update error");
      } else {
        setError("Profile update error");
      }
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.avatarWrapper}>
          <Image
            src="/default-avatar.svg"
            alt="User Avatar"
            width={140}
            height={140}
            className={css.avatar}
          />
        </div>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {fieldError && <span className={css.error}>{fieldError}</span>}
          </div>
          <div className={css.infoItem}>
            <span className={css.label}>Email:</span> {user.email}
          </div>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className={css.cancelButton}>
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
} 