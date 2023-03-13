import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout() {

    auth.signOut();
    navigate("/");

  }

  function onChange(e) {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    
  }

  async function onSubmit() {

    try {

      if( (name.length > 0) && (email.length > 0)) {
        // update display name in firebase auth;
        await updateProfile(auth.currentUser, {
          displayName: name,
          email: email

        });
          
        //update name in the firestore;
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
          email,
        });
        toast.success('Your profile has been successfully updated!');

      } else {
       return toast.error('Sorry, could not update your profile! Please try again later!');
      }

      
    } catch (error) {

      toast.error('Sorry, could not update your profile! Please try again later!');

    }

  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}

            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`text-black text-xl mb-6 w-full px-4 border-gray-300 rounded transition ease-in-out 
              ${changeDetail && 'bg-red-200 focus:bg-red-200'}`}
            />

            {/* Email Input */}

            <input
              type="email"
              id="email"
              value={email}
              disabled={!changeDetail}
              onChange={onChange}
              className={`text-black text-xl mb-6 w-full px-4 border-gray-300 rounded transition ease-in-out 
              ${changeDetail && 'bg-red-200 focus:bg-red-200'}`}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {

                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-800 transition ease-in-out
              duration-200 ml-2 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>

              <p
                onClick={onLogout}
                className="text-green-600 hover:text-green-800 transition duration-200 ease-in-out
            cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
