"use client";
import Head from "next/head";
import css from "./ProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="User profile page" />
      </Head>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <a href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </a>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="/default-avatar.svg"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
} 