// import FirebaseAuth from "../components/auth/FirebaseAuth"
// import { useUser } from "../firebase/useUser"

// export default function Auth() {
//     const { user, logout } = useUser()

//     if (user) {
//         return (
//             <>
//                 <h1>{user.name}</h1>
//                 <h3>{user.email}</h3>
//                 <button onClick={() => logout()}>Logout</button>
//             </>
//         )
//     }

//     else return (
//         <div>
//             <div>
//                 <FirebaseAuth />
//                 <p><a href="/">Go Home</a></p>
//             </div>
//         </div>
//     )
// }

import firebase from "../firebase/clientApp";
import Auth from '../components/Auth'
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignInScreen() {
    const [user, loading, error] = useAuthState(firebase.auth())

    if (user) {
        return (
            <>
                <h1>{user.displayName}</h1>
                <h2>{user.email}</h2>
                <h2>{user.uid}</h2>
            </>
        )
    }

    else return (
        <>
            <Auth />
        </>
    )
}