import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { getUserServer } from "@/lib/api/serverApi";
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Profile Page",
    description: "User profile page",
  };
};

export default async function ProfilePage() {
  const user = await getUserServer();
  if (!user) return null;

  return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
          </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
            src={user.avatarUrl || "/default-avatar.svg"}
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
  );
} 