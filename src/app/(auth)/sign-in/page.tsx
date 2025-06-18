'use client'
import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signen in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    }
    return (
        <>
            Not Signed in <br />
            <button className="bg-orange-500" onClick={() => signIn()}> Sign In</button>
        </>
    )
}